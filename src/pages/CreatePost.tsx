import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Upload, Sparkles, Wand2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import FormField from "@/components/FormField";
import { getRandomPrompt } from "@/utils";
import { toast } from "sonner";

const CreatePost = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    name: "",
    prompt: "",
    photo: "",
  });

  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ Always re-check errors when submitting
  const getErrors = () => {
    const errors: string[] = [];
    if (!form.prompt?.trim()) errors.push("Prompt is required");
    if (!form.title?.trim()) errors.push("Title is required");
    if (!form.name?.trim()) errors.push("Name is required");
    return errors;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const errors = getErrors();
    if (errors.length > 0) {
      toast.info(errors.join(" • "), { duration: 5000 });
      return;
    }

    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        const response = await fetch("https://ai-artgen-backtend.vercel.app/api/post", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });

        await response.json();
        navigate("/gallery");
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please enter a prompt and generate an image");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  const generateImage = async () => {
    const errors = getErrors();
    if (errors.length > 0) {
      toast.info(errors.join(" • "), { duration: 5000 });
      return;
    }

    try {
      setGeneratingImg(true);
      setForm({ ...form, photo: "" });

      const response = await fetch("http://localhost:5000/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: form.prompt }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      // ✅ Fix: Gemini returns raw base64 (imageBase64)
      const imageUrl = `data:image/png;base64,${data.imageBase64}`;
      setForm({ ...form, photo: imageUrl });
    } catch (error: any) {
      alert(error.message || "Something went wrong");
    } finally {
      setGeneratingImg(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-blue-600/10 pointer-events-none" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />

      <Navigation />

      <main className="pt-24 pb-12">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="mb-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            <h1 className="text-4xl font-bold mb-2">
              Create & Share <span className="text-gradient">Your Art</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Generate unique images and share them with the community
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Generation Form */}
            <Card className="shadow-xl bg-card/95 backdrop-blur-sm border-primary/10 h-96">
              <CardHeader className="bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-t-xl">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Wand2 className="w-6 h-6 text-primary" />
                  Generate Image
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 overflow-y-auto">
                <div className="space-y-2 mt-3">
                  <FormField
                    labelName="Image Prompt"
                    type="text"
                    name="prompt"
                    placeholder="A magical forest with glowing flowers and floating fireflies, photorealistic, soft mystical lighting, ultra-detailed textures"
                    value={form.prompt}
                    handleChange={handleChange}
                    isSurpriseMe
                    handleSurpriseMe={handleSurpriseMe}
                  />
                </div>

                <Button
                  onClick={generateImage}
                  disabled={generatingImg}
                  className="w-full btn-gradient"
                >
                  {generatingImg ? (
                    <>
                      <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate Image
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Post Details Form */}
            <Card className="shadow-xl bg-card/95 backdrop-blur-sm border-primary/10 h-96">
              <CardHeader className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-t-xl">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Upload className="w-6 h-6 text-primary" />
                  Post Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 mt-3 overflow-y-auto">
                <FormField
                  labelName="Title"
                  type="text"
                  name="title"
                  placeholder="Enter your image title"
                  value={form.title}
                  handleChange={handleChange}
                  isSurpriseMe={undefined}
                  handleSurpriseMe={undefined}
                />

                <FormField
                  labelName="Name"
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={form.name}
                  handleChange={handleChange}
                  isSurpriseMe={undefined}
                  handleSurpriseMe={undefined}
                />

                <Button
                  onClick={handleSubmit}
                  disabled={!form.photo || loading} // ✅ disable if no photo OR submitting
                  variant="outline"
                  className="w-full"
                >
                  {loading ? "Publishing..." : "Publish to Gallery"}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Generated Image Preview */}
          {(form.photo || generatingImg) && (
            <Card className="mt-8 overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-[#1a1b3a]/95 via-[#221b44]/95 to-[#2b1f55]/95 backdrop-blur-xl border border-purple-900/30">
              <CardHeader className="p-6 border-b border-purple-900/30">
                <CardTitle className="text-2xl font-semibold text-purple-100 tracking-tight">
                  ✨ Generated Image
                </CardTitle>
              </CardHeader>

              <CardContent className="p-6 space-y-6">
                <div className="aspect-square w-full max-w-lg mx-auto bg-[#141427]/70 rounded-xl overflow-hidden flex items-center justify-center border border-purple-900/30 shadow-inner">
                  {generatingImg ? (
                    <div className="flex flex-col items-center justify-center text-center space-y-3">
                      <Sparkles className="w-12 h-12 animate-spin text-purple-400" />
                      <p className="text-purple-300 text-sm">
                        Creating your masterpiece...
                      </p>
                    </div>
                  ) : (
                    <img
                      src={form.photo}
                      alt={form.prompt}
                      className="w-full h-full object-cover hover:scale-[1.10] transition-transform duration-500"
                    />
                  )}
                </div>

                {form.photo && (
                  <div className="grid gap-4 sm:grid-cols-2 bg-[#141427]/60 p-5 rounded-xl border border-purple-800/40 shadow-md">
                    <div>
                      <p className="text-xs text-purple-400 uppercase">Prompt</p>
                      <p className="text-sm font-medium text-purple-100">
                        {form.prompt}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-purple-400 uppercase">Title</p>
                      <p className="text-sm font-medium text-purple-100">
                        {form.title}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-purple-400 uppercase">Name</p>
                      <p className="text-sm font-medium text-purple-100">
                        {form.name}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default CreatePost;
