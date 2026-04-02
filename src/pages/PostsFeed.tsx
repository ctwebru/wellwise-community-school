import React, { useState } from 'react';
import { MOCK_POSTS, Post } from '@/data/mockData';
import PostCard from '@/components/PostCard';
import PostDetail from '@/components/PostDetail';

const PostsFeed = () => {
  const [posts, setPosts] = useState<Post[]>(
    MOCK_POSTS.filter((p) => p.section === 'posts' && p.status === 'published')
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

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="px-4 pt-6 pb-2">
        <h1 className="text-2xl font-bold text-foreground">Посты</h1>
        <p className="text-sm text-muted-foreground mt-1">Полезные материалы для вашего здоровья</p>
      </div>

      <div className="px-4 space-y-3 mt-2">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onOpen={setSelectedPost}
            onToggleFavorite={toggleFavorite}
          />
        ))}
      </div>
    </div>
  );
};

export default PostsFeed;
