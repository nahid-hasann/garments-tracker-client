import React from 'react';

const SkeletonCard = () => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-3 space-y-3 animate-pulse">
           
            <div className="h-40 bg-slate-200 rounded-lg w-full"></div>

            <div className="space-y-2">
                
                <div className="h-4 bg-slate-200 rounded w-3/4"></div>

                {/* Subtitle Placeholder */}
                <div className="h-3 bg-slate-200 rounded w-1/2"></div>
            </div>

            {/* Price & Button Placeholder */}
            <div className="flex justify-between items-center pt-2">
                <div className="h-5 bg-slate-200 rounded w-16"></div>
                <div className="h-4 bg-slate-200 rounded w-20"></div>
            </div>
        </div>
    );
};

export default SkeletonCard;