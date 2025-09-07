import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Eye, ArrowLeft, Download } from "lucide-react";
import Loader from "@/components/Loader";
import { downloadImage } from "@/utils";

const SinglePostPage = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);

  const fetchPost = async () => {
    try {
      const response = await fetch(`https://ai-artgen-backtend.vercel.app//api/post/${id}`);
      if (response.ok) {
        const result = await response.json();
        setPost(result.data);
      }
    } catch (err) {
      console.error("Failed to fetch post:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  const handleLike = async () => {
    if (!post) return;
    try {
      if (!liked) {
        await fetch(`https://ai-artgen-backtend.vercel.app//api/post/${post._id}/like`, {
          method: "PATCH",
        });
        setPost((prev: any) => ({
          ...prev,
          likes: (prev.likes || 0) + 1,
        }));
      } else {
        setPost((prev: any) => ({
          ...prev,
          likes: (prev.likes || 0) - 1,
        }));
      }
      setLiked(!liked);
    } catch (err) {
      console.error("Error liking post:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground text-lg">Post not found</p>
        <Link to="/">
          <Button className="mt-6">Back to Home</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <main className="container mx-auto px-6 pt-24 pb-12">
        {/* Back Button */}
        <Link to="/gallery">
          <Button
            className="mb-8 flex items-center gap-2 hover:bg-primary/10 btn-gradient"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Gallery
          </Button>
        </Link>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Image */}
          <div className="overflow-hidden rounded-2xl shadow-xl">
            <img
              src={post.photo}
              alt={post.title || "Artwork"}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div>
            <h1 className="text-4xl font-bold mb-4">
              {post.title || "Untitled"}
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              by {post.name || "Anonymous"}
            </p>

            <p className="text-base mb-6">
              <span className="font-semibold">Prompt:</span> "{post.prompt}"
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {(post.tags || []).map((tag: string) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6 mb-8 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Heart className="w-4 h-4" /> {post.likes || 0} Likes
              </span>
              <span className="flex items-center gap-2">
                <Eye className="w-4 h-4" /> {post.views || 0} Views
              </span>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <Button
                onClick={handleLike}
                className={`${
                  liked ? "bg-red-500 hover:bg-red-600" : "btn-gradient"
                }`}
              >
                <Heart
                  className={`w-4 h-4 mr-2 ${
                    liked ? "fill-current text-white" : ""
                  }`}
                />
                {liked ? "Liked" : "Like"}
              </Button>

              <Button
                className="bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 shadow-lg"
                onClick={() => downloadImage(post.photo, post.title || "artwork")}
              >
                <Download className="w-4 h-4 mr-2" /> Download
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SinglePostPage;
