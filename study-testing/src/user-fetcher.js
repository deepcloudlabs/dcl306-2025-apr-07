import React, { useEffect, useState } from 'react';

export default function UserProfile() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch('/api/user')
            .then((res) => res.json())
            .then((data) => setUser(data));
    }, []);

    if (!user) return <div>Loading...</div>;

    return <div>User: {user.name}</div>;
}