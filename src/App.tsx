import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreatePost from "./pages/CreatePost";
import Gallery from "./pages/Gallery";
import NotFound from "./pages/NotFound";
import Index from "./pages/Index";
import { Toaster } from "sonner";
import SinglePostPage from "./pages/SinglePostPage";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/post/:id" element={<SinglePostPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster richColors />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
