import './App.css'
import { PostComponent } from './Post';
import { useState } from 'react';
import { ProfileCard } from './ProfileCard';
import { NavComponent } from './navbar';

function App() {
  const [posts, setPosts] = useState([]);
  function addPost() {
    if (posts.length < 5) {
      posts.push({
        Name: "John Doe",
        time: "1 day ago",
        subtitle: "1000 followers",
        image: "https://appx-wsb-gcp-mcdn.akamai.net.in/subject/2023-01-17-0.17044360120951185.jpg"
      })
      setPosts([...posts])
    } else {
      alert("You can't add more than 5 posts")
    }
  }

  const PostComponents = posts.map(post =>
    <PostComponent Name={post.Name}
      time={post.time}
      subtitle={post.subtitle}
      image={post.image}
    />
  )


  return (
    <div style={{ backgroundColor: "#dfe6e9", height: "100vh" }}>
      <div>
        <NavComponent />
      </div>
      <div style={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
      }}>
        <div>
          <div style={{ display: "flex", justifyContent: "center", }}>
            <ProfileCard />
          </div>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", }}>
            <button onClick={addPost} style={{
              backgroundColor: "#0984e3",
              color: "white",
              border: "none",
              borderRadius: 8,
              padding: "12px 24px",
              fontSize: 16,
              fontWeight: "600",
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(9, 132, 227, 0.3)",
              transition: "all 0.3s ease",
            }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#0770c7";
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 4px 12px rgba(9, 132, 227, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "#0984e3";
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 2px 8px rgba(9, 132, 227, 0.3)";
              }}
            >Add Post</button>
          </div>
        </div>
        <div>
          <div>
            {posts.length > 0 ? PostComponents : <div style={{
              fontSize: "20px", color: "gray", margin: "20px", padding: "20px",
            }}>No posts</div>}
          </div>
        </div>
      </div>
    </div>
  )
}



export default App
