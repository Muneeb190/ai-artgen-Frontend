import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Heart, Download, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Loader from "@/components/Loader";
import Navigation from "@/components/Navigation";
import { downloadImage } from "@/utils";

const Gallery = () => {
  const [allPosts, setAllPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const navigate = useNavigate();

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://ai-artgen-backtend.vercel.app//api/post?sort=${sortBy}`,
        { method: "GET", headers: { "Content-Type": "application/json" } }
      );
      if (response.ok) {
        const result = await response.json();
        setAllPosts(result.data);
      }
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [sortBy]);

  const allTags = Array.from(new Set(allPosts.flatMap((post) => post.tags || [])));

  const filteredPosts = allPosts
    .filter(
      (post) =>
        post.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.prompt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.title?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((post) => selectedTag === "" || post.tags?.includes(selectedTag));

  const handleLike = async (postId: string) => {
    const isLiked = likedPosts.has(postId);
    try {
      if (!isLiked) {
        await fetch(`https://ai-artgen-backtend.vercel.app//api/post/${postId}/like`, { method: "PATCH" });
      }
      setLikedPosts((prev) =>
        isLiked
          ? new Set([...prev].filter((id) => id !== postId))
          : new Set([...prev, postId])
      );
      setAllPosts((prev) =>
        prev.map((post) =>
          post._id === postId
            ? { ...post, likes: (post.likes || 0) + (isLiked ? -1 : 1) }
            : post
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleView = async (postId: string) => {
    try {
      await fetch(`https://ai-artgen-backtend.vercel.app//api/post/${postId}/view`, { method: "PATCH" });
      setAllPosts((prev) =>
        prev.map((post) =>
          post._id === postId ? { ...post, views: (post.views || 0) + 1 } : post
        )
      );
      navigate(`/post/${postId}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 relative overflow-hidden">
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-6">
          <Navigation />

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Community <span className="text-gradient">Gallery</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Discover amazing AI-generated artwork created by our community
            </p>
            <Button className="btn-gradient" onClick={() => navigate("/create")}>
              Create Your Own
            </Button>
          </div>

          {/* Filters */}
          <div className="mb-8 flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search artwork..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex gap-2 items-center flex-wrap">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 rounded-md border border-input bg-background text-sm"
              >
                <option value="newest">Newest</option>
                <option value="likes">Most Liked</option>
                <option value="views">Most Viewed</option>
              </select>

              <Button
                variant={selectedTag === "" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTag("")}
              >
                All
              </Button>

              {allTags.slice(0, 5).map((tag) => (
                <Button
                  key={tag}
                  variant={selectedTag === tag ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTag(selectedTag === tag ? "" : tag)}
                >
                  {tag}
                </Button>
              ))}
            </div>
          </div>

          {/* Loader */}
          {loading ? (
            <div className="flex justify-center items-center">
              <Loader />
            </div>
          ) : filteredPosts.length > 0 ? (
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-6">
              {filteredPosts.map((post, index) => {
                const isBig = index % 7 === 0;
                const heightClass = isBig ? "h-96" : "h-60";

                return (
                  <div
                    key={post._id}
                    className={`break-inside-avoid mb-6 relative group rounded-xl overflow-hidden shadow-md ${heightClass}`}
                  >
                    {/* Clickable layer */}
                    <div
                      className="absolute inset-0 z-10 cursor-pointer"
                      onClick={() => handleView(post._id)}
                    />

                    <img
                      src={post.photo}
                      alt={post.title || post.prompt}
                      className="w-full h-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 z-20 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 pointer-events-none">
                      <h3 className="text-white font-semibold">{post.title || "Untitled"}</h3>
                      <p className="text-sm text-white opacity-90 mb-2">
                        by {post.name || "Anonymous"}
                      </p>
                      <div className="flex justify-between items-center pointer-events-auto">
                        <div className="flex gap-2 text-white text-sm">
                          <span className="flex items-center gap-1">
                            <Heart className="w-4 h-4" /> {post.likes || 0}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="w-4 h-4" /> {post.views || 0}
                          </span>
                        </div>
                        <div className="flex gap-2 absolute top-3 right-3">
                          <Button
                            size="sm"
                            variant="secondary"
                            className={`h-8 w-8 p-0 ${
                              likedPosts.has(post._id)
                                ? "bg-red-500 hover:bg-red-600 text-white"
                                : "bg-white/90 hover:bg-white"
                            }`}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleLike(post._id);
                            }}
                          >
                            <Heart className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="secondary"
                            className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
                            onClick={(e) => {
                              e.stopPropagation();
                              downloadImage(post.photo, post.title || "artwork");
                            }}
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="absolute top-2 left-2 flex flex-wrap gap-1 z-30">
                      {(post.tags || []).slice(0, 3).map((tag: string) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No artwork found matching your search criteria
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Gallery;