import { useState, useMemo } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const ExpenseBreakdownCard = ({ transactions, categoryData, COLORS, fmt }) => {
    const [timeFilter, setTimeFilter] = useState('current');

    // Filter transactions and calculate total expenses per category based on the selected time period
    const filteredCategoryData = useMemo(() => {
        if (!transactions || transactions.length === 0) return categoryData;
        
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        const filtered = transactions.filter(t => {
            if (t.type !== 'expense') return false;
            
            const tDate = new Date(t.date);
            if (timeFilter === 'all') return true;
            
            if (timeFilter === 'current') {
                return tDate.getMonth() === currentMonth && tDate.getFullYear() === currentYear;
            }
            
            if (timeFilter === 'last2') {
                const twoMonthsAgo = new Date(currentYear, currentMonth - 1, 1);
                return tDate >= twoMonthsAgo;
            }
            return true;
        });

        const catMap = {};
        filtered.forEach(t => {
            catMap[t.category] = (catMap[t.category] || 0) + (parseFloat(t.amount) || 0);
        });
        
        return Object.entries(catMap)
            .map(([name, value]) => ({ name, value }))
            .sort((a, b) => b.value - a.value);
            
    }, [transactions, timeFilter, categoryData]);

    return (
        <div className="card bg-base-200 dark:bg-base-200/50 border border-base-content/10 dark:border-base-content/20 shadow-sm p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-base-content dark:text-base-content/90 text-base sm:text-lg">Expense Breakdown</h3>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="text-base-content/60 text-[10px] sm:text-[11px] font-medium hover:text-base-content transition-colors cursor-pointer flex items-center gap-1">
                        {timeFilter === 'current' ? 'Current Month' : timeFilter === 'last2' ? 'Last 2 Months' : 'All Time'}
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                    </div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-lg bg-base-100 dark:bg-base-200 border border-base-content/10 dark:border-base-content/20 rounded-box w-36 mt-2 text-xs">
                        <li><a className={timeFilter === 'current' ? 'active font-semibold' : ''} onClick={() => { setTimeFilter('current'); document.activeElement.blur(); }}>Current Month</a></li>
                        <li><a className={timeFilter === 'last2' ? 'active font-semibold' : ''} onClick={() => { setTimeFilter('last2'); document.activeElement.blur(); }}>Last 2 Months</a></li>
                        <li><a className={timeFilter === 'all' ? 'active font-semibold' : ''} onClick={() => { setTimeFilter('all'); document.activeElement.blur(); }}>All Time</a></li>
                    </ul>
                </div>
            </div>
            {filteredCategoryData.length > 0 ? (
                <div className="space-y-4">
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie data={filteredCategoryData} cx="50%" cy="50%" innerRadius={50} outerRadius={90} paddingAngle={2} dataKey="value" label={false}>
                                {filteredCategoryData.map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value) => fmt(value)} contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '8px', color: '#fff' }} />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                        {filteredCategoryData.map((cat, idx) => (
                            <div key={cat.name} className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></div>
                                <div className="min-w-0">
                                    <p className="font-semibold text-base-content dark:text-base-content/90 truncate">{cat.name}</p>
                                    <p className="text-base-content/60 dark:text-base-content/50">{fmt(cat.value)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="h-80 flex items-center justify-center text-base-content/40">No expenses yet</div>
            )}
        </div>
    );
};

export default ExpenseBreakdownCard;
