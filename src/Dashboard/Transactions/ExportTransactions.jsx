import { useState } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { FileText, FileSpreadsheet } from 'lucide-react';

const ExportTransactions = ({ transactions, filter }) => {
    const generatePDF = () => {
        const doc = new jsPDF();
        
        const filteredTx = transactions.filter(t => filter === 'all' || t.type?.toLowerCase() === filter.toLowerCase());
        
        let heading = 'All Transactions';
        if (filter === 'expense') heading = 'All Expenses';
        if (filter === 'income') heading = 'All Incomes';

        doc.setFontSize(18);
        doc.text(`Cashnivo - ${heading}`, 14, 22);

        const tableColumn = ["Date", "Category", "Title", "Type", "Amount"];
        const tableRows = [];

        filteredTx.forEach(t => {
            const rowData = [
                new Date(t.date).toLocaleDateString('en-US'),
                t.category || '',
                t.description || '',
                t.type || '',
                `$${t.amount}`
            ];
            tableRows.push(rowData);
        });

        autoTable(doc, {
            startY: 30,
            head: [tableColumn],
            body: tableRows,
            theme: 'grid',
            headStyles: { fillColor: [37, 99, 235] }
        });

        doc.save(`Cashnivo_${heading.replace(' ', '_')}.pdf`);
    };

    const generateExcel = () => {
        const filteredTx = transactions.filter(t => filter === 'all' || t.type?.toLowerCase() === filter.toLowerCase());

        let heading = 'All Transactions';
        if (filter === 'expense') heading = 'All Expenses';
        if (filter === 'income') heading = 'All Incomes';

        const worksheetData = filteredTx.map(t => ({
            Date: new Date(t.date).toLocaleDateString('en-US'),
            Category: t.category || '',
            Title: t.description || '',
            Type: t.type || '',
            Amount: t.amount
        }));

        const worksheet = XLSX.utils.json_to_sheet(worksheetData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");

        XLSX.writeFile(workbook, `Cashnivo_${heading.replace(' ', '_')}.xlsx`);
    };

    return (
        <div className="flex items-center gap-1 bg-base-200 dark:bg-base-200/50 border border-base-content/10 dark:border-base-content/20 rounded-xl px-2 py-1.5">
            <button 
                onClick={generatePDF}
                className="flex items-center gap-1 px-2 py-1 text-sm font-medium text-base-content/70 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-md transition-colors"
            >
                <FileText size={15} />
                <span>PDF</span>
            </button>
            <button 
                onClick={generateExcel}
                className="flex items-center gap-1 px-2 py-1 text-sm font-medium text-base-content/70 hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-500/10 rounded-md transition-colors"
            >
                <FileSpreadsheet size={15} />
                <span>Excel</span>
            </button>
        </div>
    );
};

export default ExportTransactions;
