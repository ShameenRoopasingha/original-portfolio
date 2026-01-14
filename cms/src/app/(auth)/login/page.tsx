'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/app/actions/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock } from 'lucide-react';

export default function LoginPage() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const result = await login(password);
            if (result.success) {
                router.push('/dashboard');
            } else {
                setError('Access Denied: Invalid Variant credentials');
            }
        } catch {
            setError('An unexpected timeline error occurred');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-950 p-4">
            <Card className="w-full max-w-md border-orange-500/20 bg-black text-orange-500">
                <CardHeader className="text-center space-y-2">
                    <div className="mx-auto w-12 h-12 bg-orange-500/10 rounded-full flex items-center justify-center mb-2 border border-orange-500/30">
                        <Lock className="w-6 h-6 text-orange-500" />
                    </div>
                    <CardTitle className="text-2xl uppercase tracking-widest text-orange-500">TVA Access</CardTitle>
                    <CardDescription className="text-orange-500/50 uppercase tracking-wider text-xs">
                        Restricted Area • Clearance Level 10
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Input
                                type="password"
                                placeholder="Enter Access Code"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="bg-neutral-900 border-orange-500/30 text-orange-500 placeholder:text-orange-500/30 focus-visible:ring-orange-500"
                            />
                        </div>
                        {error && (
                            <div className="text-red-500 text-xs text-center uppercase tracking-wider bg-red-950/20 py-2 border border-red-900/50">
                                {error}
                            </div>
                        )}
                        <Button
                            type="submit"
                            className="w-full bg-orange-600 hover:bg-orange-700 text-black font-bold uppercase tracking-widest"
                            disabled={loading}
                        >
                            {loading ? 'Authenticating...' : 'Access Terminal'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
