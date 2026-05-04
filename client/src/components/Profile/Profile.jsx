import { useState, useEffect } from "react";
import axios from "axios";
import "./Profile.css";

const ProfileSkeleton = () => {
  return (
    <div className="profile-skeleton" aria-label="Loading profile">
      <div className="skeleton skeleton-title" />
      <div className="skeleton skeleton-avatar" />
      <div className="skeleton skeleton-email" />
      <div className="skeleton skeleton-button" />
    </div>
  );
};

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:3000/profile", {
          withCredentials: true,
        });
        setUser(response.data);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const clickLogOut = async () => {
    window.location.href = "http://localhost:3000/logout";
  };

  if (loading) return <ProfileSkeleton />;
  if (!user) return <p>Not logged in.</p>;
  return (
    <div>
      <h2>Hello {user.given_name || user.name}</h2>
      {user.picture && (
        <img
          src={user.picture}
          alt={user.name}
          style={{ width: 80, borderRadius: "50%" }}
        />
      )}
      <h4>
        <a href={`mailto:${user.email}`}>{user.email}</a>
      </h4>

      <button onClick={clickLogOut}>Logout</button>
    </div>
  );
};

export default Profile;
