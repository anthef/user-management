"use client"

import { RiMoonLine, RiSunLine } from 'react-icons/ri';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

export function ModeToggle() {
    const { theme, setTheme, systemTheme } = useTheme();
    const currentTheme = theme === 'system' ? systemTheme : theme;

    return (
            <Switch className={cn("w-10 h-6")}
                checked={currentTheme === 'dark'}
                onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
            >
                {currentTheme === 'dark' ? (
                    <RiSunLine className="w-5 h-5" />
                ) : (
                    <RiMoonLine className="w-5 h-5" />
                )}
            </Switch>
    );
}