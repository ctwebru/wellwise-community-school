import React, { useState } from 'react';
import { MOCK_POSTS, Post } from '@/data/mockData';
import PostCard from '@/components/PostCard';
import PostDetail from '@/components/PostDetail';
import { Bookmark } from 'lucide-react';

const FavoritesScreen = () => {
  const [posts, setPosts] = useState<Post[]>(
    MOCK_POSTS.filter((p) => p.isFavorited)
  );
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const toggleFavorite = (id: string) => {
    setPosts(posts.map((p) => (p.id === id ? { ...p, isFavorited: !p.isFavorited } : p)));
    if (selectedPost?.id === id) {
      setSelectedPost({ ...selectedPost, isFavorited: !selectedPost.isFavorited });
    }
  };

  if (selectedPost) {
    return (
      <PostDetail
        post={selectedPost}
        onBack={() => setSelectedPost(null)}
        onToggleFavorite={toggleFavorite}
      />
    );
  }

  const favoritePosts = posts.filter((p) => p.isFavorited);

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="px-4 pt-6 pb-2">
        <h1 className="text-2xl font-bold text-foreground">Избранное</h1>
        <p className="text-sm text-muted-foreground mt-1">Сохранённые материалы</p>
      </div>

      {favoritePosts.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-6 py-20 animate-fade-in">
          <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
            <Bookmark className="w-7 h-7 text-muted-foreground" />
          </div>
          <h3 className="text-base font-semibold text-foreground">Пока пусто</h3>
          <p className="text-sm text-muted-foreground text-center mt-1 max-w-[240px]">
            Добавляйте посты в избранное, чтобы вернуться к ним позже
          </p>
        </div>
      ) : (
        <div className="px-4 space-y-3 mt-2">
          {favoritePosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onOpen={setSelectedPost}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesScreen;
