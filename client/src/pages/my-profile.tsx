import { useGetIdentity, useOne } from '@pankod/refine-core';

import { Profile } from 'components';

const MyProfile = () => {
  // Get the authenticated user's identity
  const { data: user } = useGetIdentity();

  // Fetch the user's profile data
  const { data, isLoading, isError } = useOne({
    resource: 'users',
    id: user?.userid,
  });

  // Extract the user's profile from the fetched data
  const myProfile = data?.data ?? [];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong!</div>;
  }

  // Render the user's profile using the Profile component
  return (
    <Profile
      type="My"
      name={myProfile?.name}
      avatar={myProfile?.avatar}
      email={myProfile?.email}
      properties={myProfile?.allProperties}
    />
  );
};

export default MyProfile;
