"use client";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState, useEffect } from 'react';

export default function UserProfile() {
    const { user } = useKindeBrowserClient();
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
        // Reset image error state when user changes
        setImageError(false);
    }, [user]);

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
            {userPfp && !imageError ? (
                <AvatarImage 
                    src={userPfp} 
                    alt={`Profile picture of ${user.given_name || user.family_name || 'user'}`}
                    onError={() => setImageError(true)}
                />
            ) : (
                <AvatarFallback>{fallbackText.toUpperCase()}</AvatarFallback>
            )}
        </Avatar>
    );
}