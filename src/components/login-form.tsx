import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import imgLogin from "@/assets/imgLogin.png"; // Giữ ảnh đã nhập
import musicLogin from "@/assets/musicLogin.mp3";
import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Kiểm tra và cập nhật trạng thái responsive
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Kiểm tra nếu màn hình dưới 768px
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Kiểm tra khi trang web lần đầu được load

    // Dọn dẹp event listener khi component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Ngừng cuộn trang và dừng nhạc khi ở chế độ responsive
  useEffect(() => {
    if (isMobile) {
      document.body.style.overflow = "hidden"; // Ẩn cuộn trang khi ở mobile
      if (audioRef.current) {
        audioRef.current.pause(); // Dừng nhạc khi ở mobile
      }
    } else {
      document.body.style.overflow = "auto"; // Cho phép cuộn lại khi không phải ở chế độ responsive
    }

    // Cleanup overflow khi component bị unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const url = isLogin ? "/api/login" : "/api/register";
    const payload = isLogin
      ? { username: formData.username, password: formData.password }
      : formData;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Something went wrong");

      alert(isLogin ? "Login successful!" : "Account created successfully!");
      if (isLogin) localStorage.setItem("token", data.token);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-6 w-full max-h-screen overflow-y-auto",
        className
      )}
      {...props}
    >
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">
                  {isLogin ? "Welcome back" : "Create an account"}
                </h1>
                <p className="text-muted-foreground">
                  {isLogin ? "Login to your account" : "Sign up to get started"}
                </p>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  placeholder="Enter your password"
                  onChange={handleChange}
                  required
                />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Processing..." : isLogin ? "Login" : "Sign Up"}
              </Button>

              <div className="flex flex-col gap-3">
                {isLogin && (
                  <Button variant="outline" className="w-full">
                    <FcGoogle />
                    Login with Google
                  </Button>
                )}
              </div>

              <div className="text-center text-sm">
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}{" "}
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="underline underline-offset-4"
                >
                  {isLogin ? "Sign up" : "Login"}
                </button>
              </div>
            </div>
          </form>

          <div className="flex justify-center items-center relative hidden sm:block">
            <img
              src={imgLogin}
              alt="Login Image"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-6 w-full flex justify-center">
              <audio
                ref={audioRef}
                autoPlay
                controls
                className="bg-black p-2 rounded"
              >
                <source src={musicLogin} type="audio/mp3" />
              </audio>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
