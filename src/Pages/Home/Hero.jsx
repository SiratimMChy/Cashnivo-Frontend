import { Link } from 'react-router';
import { TrendingUp, ArrowRight } from 'lucide-react';
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import axios from 'axios';

const formatNum = n =>
    new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(n) + '+';

const Hero = () => {
    const { user } = useContext(AuthContext);
    const [stats, setStats] = useState([
        { label: 'Active Users', value: '—' },
        { label: 'Transactions Logged', value: '—' },
        { label: 'Custom Categories', value: '—' },
    ]);

    useEffect(() => {
        axios.get('https://cashnivo.vercel.app/stats')
            .then(res => {
                const { users, transactions, categories } = res.data;
                setStats([
                    { label: 'Active Users', value: formatNum(users) },
                    { label: 'Transactions Logged', value: formatNum(transactions) },
                    { label: 'Custom Categories', value: formatNum(categories) },
                ]);
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <section className="relative overflow-hidden bg-base-100 min-h-0 sm:min-h-screen flex flex-col justify-center px-4 py-8 sm:py-20 lg:px-10">
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -top-32 -right-32 w-125 h-125 rounded-full bg-blue-600/10 dark:bg-blue-400/10 blur-3xl" />
                <div className="absolute -bottom-32 -left-32 w-100 h-100 rounded-full bg-cyan-600/10 dark:bg-cyan-400/10 blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-75 rounded-full bg-purple-600/10 dark:bg-purple-400/10 blur-3xl" />
            </div>

            <div className="relative max-w-7xl mx-auto w-full">
                <div className="flex justify-center mb-4 sm:mb-6">
                    <span className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-2xl bg-base-200 border border-base-content/10 shadow-sm text-xs sm:text-sm font-semibold text-blue-600">
                        <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        Simple & Secure Finance Tracking
                    </span>
                </div>

                <div className="text-center max-w-3xl mx-auto mb-4 sm:mb-6">
                    <h1 className="text-2xl sm:text-4xl lg:text-6xl font-extrabold text-base-content leading-tight tracking-tight">
                        Streamline Your{' '}
                        <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                            Financial Workflow
                        </span>
                    </h1>
                    <p className="mt-3 sm:mt-5 text-xs sm:text-base lg:text-lg text-base-content/70 leading-relaxed max-w-2xl mx-auto">
                        Cashnivo gives you a clean, reliable platform to record spending, manage budgets, and analyze cash flow so you can make smarter decisions with confidence.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-14">
                    <Link
                        to={user ? "/about-us" : "/register"}
                        className="btn bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold border-none shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 px-6 sm:px-8 text-sm sm:text-base"
                    >
                        {user ? "Learn More" : "Get Started"}
                        <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                    <Link
                        to="/dashboard/dashboardhome"
                        className="btn btn-outline border-2 border-blue-600 text-blue-600 hover:bg-blue-600/10 hover:border-blue-700 font-semibold transition-all duration-300 px-6 sm:px-8 text-sm sm:text-base"
                    >
                        Explore Dashboard
                    </Link>
                </div>

                <div className="flex flex-row justify-center gap-1.5 sm:gap-4 mb-6 sm:mb-16 px-1 sm:px-0">
                    {stats.map((stat, i) => (
                        <div
                            key={i}
                            className="flex-1 sm:flex-initial sm:w-72 bg-base-100 rounded-lg border border-base-content/10 shadow-sm px-1.5 py-2.5 sm:px-8 sm:py-4 text-center"
                        >
                            <p className="text-base sm:text-2xl font-extrabold bg-linear-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                                {stat.value}
                            </p>
                            <p className="text-[9px] sm:text-xs text-base-content/60 font-semibold mt-0.5 sm:mt-1 uppercase tracking-tight sm:tracking-widest leading-tight">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Hero;