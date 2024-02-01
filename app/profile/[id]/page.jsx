'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Profile from '@components/Profile';

const UserProfile = ({ params }) => {
  const searchName = useSearchParams();
  const userName = searchName.get('name');

  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchsPosts = async () => {
      const response = await fetch(`/users/${params?.id}/posts`);
      const data = await response.json();

      setUserPosts(data);
    };
    if (params?.id) fetchsPosts();
  }, [params.id]);
  return (
    <Profile
      name={userName}
      desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
      data={userPosts}
    />
  );
};

export default UserProfile;
