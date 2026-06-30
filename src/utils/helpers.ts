export const formatRating = (rating: number): string => rating.toFixed(1);
export const formatYear = (date: string): string => {  
if (!date) return 'N/A';  
return new Date(date).getFullYear().toString();
};
export const formatRuntime = (minutes: number | null): string => {  
if (!minutes) return 'N/A';  
const h = Math.floor(minutes / 60);  
const m = minutes % 60;  
return h > 0 ? `${h}h ${m}m` : `${m}m`;
};
export const formatVoteCount = (count: number): string => {  
if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;  
return count.toString();
};
export const getRatingColor = (rating: number): string => {  
if (rating >= 7.5) return 'text-green-400';  
if (rating >= 6) return 'text-yellow-400';  
return 'text-red-400';
};
