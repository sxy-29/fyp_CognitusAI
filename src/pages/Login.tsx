import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/stores/useAuthStore";
import { useState } from "react";
import api from "@/lib/api";
import { useNavigate } from "react-router";

function LoginForm() {
    const login = useAuthStore((s) => s.login);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();

        try {
            const res = await api.post("/auth/login", {
                email,
                password,
            });

            login(res.data.token, res.data.user);

            // redirect after login
            navigate("/");
        } catch (err) {
            console.error(err);
            setError("Invalid email or password!");
        }
    };

    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-primary/10">
            <div className="w-full max-w-sm">
                <div className={cn("flex flex-col gap-6")}>
                    <Card>
                        <CardHeader className="text-center">
                            <CardTitle className="leading-none text-2xl font-bold font-serif text-blue-600 text-nowrap">Welcome to Cognitus</CardTitle>
                            {error ? (
                                <FieldError>{error}</FieldError>
                            ) : (
                                <CardDescription>
                                    Enter provided email to login
                                </CardDescription>
                            )}
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={onSubmit}>
                                <FieldGroup>
                                    <Field>
                                        <FieldLabel htmlFor="email">Email</FieldLabel>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="m@example.com"
                                            className={error ? "border-red-500" : ""}
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </Field>
                                    <Field>
                                        <div className="flex items-center">
                                            <FieldLabel htmlFor="password">Password</FieldLabel>
                                            {/* <a
                                                href="#"
                                                className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                            >
                                                Forgot your password?
                                            </a> */}
                                        </div>
                                        <Input
                                            id="password"
                                            type="password"
                                            placeholder="Password"
                                            className={error ? "border-red-500" : ""}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </Field>
                                    <Field>
                                        <Button type="submit">Login</Button>
                                        {/* <Button variant="outline" type="button">
                                    Login with Google
                                </Button> */}
                                        {/* <FieldDescription className="text-center">
                                    Don&apos;t have an account? <a href="#">Sign up</a>
                                </FieldDescription> */}
                                    </Field>
                                </FieldGroup>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default LoginForm;