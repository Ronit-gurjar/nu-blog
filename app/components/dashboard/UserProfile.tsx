"use client";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function UserProfile() {
    const { user } = useKindeBrowserClient();

    if (!user) {
        return (
            <Avatar>
                <AvatarFallback>?</AvatarFallback>
            </Avatar>
        );
    }

    const userPfp = user.picture ?? '';
    const fallbackText = user.given_name?.[0] || user.family_name?.[0] || 'U';

    return (
        <Avatar>
            <AvatarImage 
                src={userPfp} 
                alt={`Profile picture of ${user.given_name || user.family_name || 'user'}`} 
            />
            <AvatarFallback>{fallbackText.toUpperCase()}</AvatarFallback>
        </Avatar>
    );
}