import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { AuthContext } from '../../Provider/AuthProvider';
import { Plus, Trash2, Edit2, Target } from 'lucide-react';

const Budgets = () => {
    const { user } = useContext(AuthContext);
    const [budgets, setBudgets] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({ category: '', amount: '' });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        if (!user?.email) return;
        fetchData();
    }, [user?.email]);

    const fetchData = () => {
        setLoading(true);
        const fetchBudgets = axios.get(`https://cashnivo.vercel.app/budgets?email=${encodeURIComponent(user.email)}`).catch(() => ({ data: [] }));
        const fetchTx = axios.get(`https://cashnivo.vercel.app/transactions?email=${encodeURIComponent(user.email)}`);
        const fetchCats = axios.get(`https://cashnivo.vercel.app/categories?email=${encodeURIComponent(user.email)}`);

        Promise.all([fetchBudgets, fetchTx, fetchCats])
            .then(([budgetsRes, txRes, catRes]) => {
                setBudgets(Array.isArray(budgetsRes.data) ? budgetsRes.data : []);
                setTransactions(Array.isArray(txRes.data) ? txRes.data : []);
                setCategories(Array.isArray(catRes.data) ? catRes.data : []);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                toast.error("Failed to load budgets data.");
                setLoading(false);
            });
    };

    const handleOpenModal = (budget = null) => {
        if (budget) {
            setFormData({ category: budget.category, amount: budget.amount });
            setEditingId(budget._id);
        } else {
            setFormData({ category: '', amount: '' });
            setEditingId(null);
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.category || !formData.amount) {
            toast.error('Please fill in all fields');
            return;
        }

        const payload = {
            email: user.email,
            category: formData.category,
            amount: parseFloat(formData.amount)
        };

        try {
            if (editingId) {
                await axios.put(`https://cashnivo.vercel.app/budgets/${editingId}`, payload);
                toast.success('Budget updated!');
            } else {
                await axios.post(`https://cashnivo.vercel.app/budgets`, payload);
                toast.success('Budget created!');
            }
            setIsModalOpen(false);
            fetchData();
        } catch (error) {
            console.error(error);
            toast.error('Failed to save budget.');
        }
    };

    const handleDelete = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`https://cashnivo.vercel.app/budgets/${id}`);
                    toast.success('Budget deleted!');
                    fetchData();
                } catch (error) {
                    toast.error('Failed to delete budget.');
                }
            }
        });
    };

    const calculateSpent = (categoryName) => {
        const now = new Date();
        const currentMonthTx = transactions.filter(t => {
            const txDate = new Date(t.date);
            return t.category === categoryName && 
                   t.type === 'expense' && 
                   txDate.getMonth() === now.getMonth() && 
                   txDate.getFullYear() === now.getFullYear();
        });
        
        return currentMonthTx.reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);
    };

    useEffect(() => {
        if (budgets.length === 0 || transactions.length === 0) return;

        let overBudgetCategories = [];

        budgets.forEach(budget => {
            const spent = calculateSpent(budget.category);
            if (spent > budget.amount) {
                overBudgetCategories.push(budget.category);
            }
        });

        if (overBudgetCategories.length > 0) {
            const warned = sessionStorage.getItem('budgetWarningShowed');
            if (!warned) {
                Swal.fire({
                    icon: 'error',
                    title: 'Limit Exceeded!',
                    html: `You have exceeded your budget for: <b>${overBudgetCategories.join(', ')}</b>`,
                    confirmButtonColor: '#ef4444',
                    confirmButtonText: 'Understood'
                });
                sessionStorage.setItem('budgetWarningShowed', 'true');
            }
        }
    }, [budgets, transactions]);

    const expenseCategories = categories.filter(c => c.type === 'expense').map(c => c.name);

    if (loading) {
        return (
            <div className="min-h-screen bg-base-100 p-6 flex justify-center items-center">
                <span className="loading loading-spinner loading-lg text-blue-600"></span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-100 px-4 py-8 lg:px-10">
            <div className="max-w-6xl mx-auto space-y-6">
                
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <div>
                        <p className="text-sm uppercase tracking-[0.2em] font-extrabold text-blue-600">
                            Cashnivo
                        </p>
                        <h1 className="text-3xl lg:text-4xl font-extrabold text-base-content mt-1">
                            Budgets & Goals
                        </h1>
                        <p className="text-base-content/70 mt-2">
                            Set monthly limits for your expenses and track your progress.
                        </p>
                    </div>
                    <button 
                        onClick={() => handleOpenModal()} 
                        className="btn bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-none shadow-md"
                    >
                        <Plus size={18} /> Add Budget
                    </button>
                </div>

                {budgets.length === 0 ? (
                    <div className="text-center py-16 bg-base-200 rounded-3xl border border-base-content/10">
                        <Target className="mx-auto h-16 w-16 text-base-content/30 mb-4" />
                        <h3 className="text-xl font-bold text-base-content mb-2">No Budgets Set</h3>
                        <p className="text-base-content/60 mb-6">Start saving by setting a limit on your monthly expenses.</p>
                        <button 
                            onClick={() => handleOpenModal()} 
                            className="btn btn-outline border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white hover:border-blue-600"
                        >
                            Create First Budget
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {budgets.map(budget => {
                            const spent = calculateSpent(budget.category);
                            const percent = Math.min((spent / budget.amount) * 100, 100);
                            const isOver = spent > budget.amount;
                            
                            let barColor = "bg-green-500";
                            if (percent > 75 && percent <= 100) barColor = "bg-warning";
                            if (isOver) barColor = "bg-error";

                            return (
                                <div key={budget._id} className={`card bg-base-200 border ${isOver ? 'border-error/50 shadow-error/10' : 'border-base-content/10'} shadow-sm p-6 relative overflow-hidden transition-all hover:shadow-md`}>
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-base-content">{budget.category}</h3>
                                            <p className="text-sm text-base-content/60 mt-1">Monthly Limit</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button onClick={() => handleOpenModal(budget)} className="btn btn-sm btn-ghost btn-square text-base-content/60 hover:text-blue-500">
                                                <Edit2 size={16} />
                                            </button>
                                            <button onClick={() => handleDelete(budget._id)} className="btn btn-sm btn-ghost btn-square text-base-content/60 hover:text-error">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="mt-4 mb-2 flex justify-between items-end">
                                        <div className="text-2xl font-extrabold text-base-content">
                                            ${spent.toFixed(2)}
                                        </div>
                                        <div className="text-sm font-medium text-base-content/60">
                                            of ${budget.amount.toFixed(2)}
                                        </div>
                                    </div>

                                    <div className="w-full bg-base-300 rounded-full h-3 mb-2 overflow-hidden">
                                        <div 
                                            className={`${barColor} h-3 rounded-full transition-all duration-500`} 
                                            style={{ width: `${percent}%` }}
                                        ></div>
                                    </div>
                                    
                                    <div className="flex justify-between text-xs font-semibold">
                                        <span className={isOver ? 'text-error' : 'text-base-content/60'}>
                                            {percent.toFixed(0)}% Used
                                        </span>
                                        <span className={isOver ? 'text-error' : 'text-success'}>
                                            {isOver 
                                                ? `-$${(spent - budget.amount).toFixed(2)} Over` 
                                                : `+$${(budget.amount - spent).toFixed(2)} Left`}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                        <div className="bg-base-100 rounded-2xl w-full max-w-md p-6 shadow-xl border border-base-content/10">
                            <h3 className="text-2xl font-bold mb-6 text-base-content">
                                {editingId ? 'Edit Budget' : 'Add New Budget'}
                            </h3>
                            
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="form-control">
                                    <label className="label"><span className="label-text font-semibold text-base-content/80">Category</span></label>
                                    <select 
                                        className="select select-bordered w-full bg-base-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent" 
                                        value={formData.category} 
                                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                                        required
                                        disabled={editingId !== null}
                                    >
                                        <option value="" disabled>Select a category</option>
                                        {expenseCategories.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-control">
                                    <label className="label"><span className="label-text font-semibold text-base-content/80">Monthly Limit ($)</span></label>
                                    <input 
                                        type="number" 
                                        step="0.01"
                                        min="1"
                                        className="input input-bordered w-full bg-base-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent" 
                                        value={formData.amount} 
                                        onChange={(e) => setFormData({...formData, amount: e.target.value})}
                                        placeholder="e.g. 300"
                                        required
                                    />
                                </div>

                                <div className="flex gap-3 mt-8">
                                    <button 
                                        type="button" 
                                        onClick={() => setIsModalOpen(false)} 
                                        className="btn btn-outline flex-1 border-base-content/20 text-base-content/70 hover:bg-base-content/10 hover:text-base-content"
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        type="submit" 
                                        className="btn flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-none shadow-md"
                                    >
                                        {editingId ? 'Update' : 'Save'} Budget
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Budgets;
