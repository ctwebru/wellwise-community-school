import React, { useState } from 'react';
import { MOCK_POSTS, Post } from '@/data/mockData';
import PostCard from '@/components/PostCard';
import PostDetail from '@/components/PostDetail';
import { ArrowLeft } from 'lucide-react';
import heroArticles from '@/assets/hero-articles.jpg';

interface PostsFeedProps {
  onBack?: () => void;
}

const PostsFeed = ({ onBack }: PostsFeedProps) => {
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
      {/* Hero header with image */}
      <div className="relative h-[220px] overflow-hidden">
        <img
          src={heroArticles}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          width={960}
          height={540}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/10" />
        {onBack && (
          <button
            onClick={onBack}
            className="absolute top-5 left-4 z-10 w-9 h-9 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
        )}
        <div className="absolute bottom-0 left-0 right-0 px-5 pb-5 z-10">
          <h1 className="text-white text-2xl font-bold font-serif">Статьи</h1>
          <p className="text-white/70 text-sm mt-0.5">Полезные материалы о здоровье</p>
        </div>
      </div>

      <div className="px-4 space-y-3 mt-4">
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
