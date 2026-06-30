import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

const searchSchema = z.object({
  query: z.string().min(2, 'Minimal 2 karakter').max(100),
});

type SearchFormValues = z.infer<typeof searchSchema>;

export const SearchBar = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<SearchFormValues>({
    resolver: zodResolver(searchSchema),
    defaultValues: { query: '' },
  });

  const onSubmit = (data: SearchFormValues) => {
    navigate(`/search?q=${encodeURIComponent(data.query.trim())}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="relative w-full max-w-xl">
      <input
        type="text"
        placeholder="Search movies..."
        {...register('query')}
        className="w-full px-4 py-2 pl-10 bg-accent border border-accent rounded-md text-white focus:outline-none focus:ring-1 focus:ring-primary"
      />
      <Search className="absolute left-3 top-2.5 text-muted" size={18} />
      {errors.query && <p className="text-red-500 text-xs mt-1">{errors.query.message}</p>}
    </form>
  );
};

