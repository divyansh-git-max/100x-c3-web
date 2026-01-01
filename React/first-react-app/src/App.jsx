import './App.css'

function App() {

  return (
    <div style={{ backgroundColor: "#dfe6e9", height: "100vh" }}>
      <div style={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
      }}>
        <div style={{ display: "flex", justifyContent: "center", }}>
          <ProfileCard />
        </div>
        <div>
          <div>
            <PostComponent />
          </div>
          <div>
            <PostComponent />
          </div>
          <div>
            <PostComponent />
          </div>
          <div>
            <PostComponent />
          </div>
          <div>
            <PostComponent />
          </div>
        </div>
      </div>
    </div>
  )
}

const style = {
  width: 250,
  backgroundColor: "white",
  borderRadius: 10,
  borderColor: "gray",
  borderWidth: 1,
  padding: 20,
  margin: 10
}

const profileCardStyle = {
  width: 250,
  height: 250,
  backgroundColor: "white",
  borderRadius: 10,
  borderColor: "gray",
  borderWidth: 1,
  margin: 10
}


function PostComponent() {
  return <div style={style}>
    <div style={{
      display: "flex",
      justifyContent: "space-around"
    }}>
      <img src={"https://appx-wsb-gcp-mcdn.akamai.net.in/subject/2023-01-17-0.17044360120951185.jpg"}
        style={{
          width: 50,
          height: 50,
          borderRadius: 50
        }}
      />
      <div style={{ fontsize: 14, marginLeft: 10 }}>
        <b>100xdevs</b>
        <div>23,888 followers</div>
        <div>12m</div>
      </div>
    </div>
    <div style={{ fontSize: 14, marginLeft: 10 }}>
      What to know how to win big? Check out how these folks won $6000 in bounties.
    </div>
  </div>
}


function ProfileCard() {
  return <div style={profileCardStyle}>

    <div style={{ backgroundColor: "#74b9ff", width: "100%", height: 50, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}></div>
    <div style={{
      display: "flex",
      justifyContent: "space-around"
    }}>
      <img src={"https://appx-wsb-gcp-mcdn.akamai.net.in/subject/2023-01-17-0.17044360120951185.jpg"}
        style={{
          width: 50,
          height: 50,
          borderRadius: 50,
          zIndex: 1000,
          position: "relative",
          top: -25
        }}
      />
    </div>
    <div style={{ fontsize: 14, marginLeft: 10 }}>
      <b>Harkirat Singh</b>
      <br />
      <div>Working with WebRTC</div>
    </div>
    <div>
      <div style={{ backgroundColor: "#3b3e40ff", width: "100%", height: 1, marginTop: 20, marginBottom: 20 }}></div>
      <div style={{
        fontSize: 14, marginLeft: 10, display: "flex", justifyContent: "space-between", paddingLeft: 10, paddingRight: 10,
        marginBottom: 10, marginTop: 10
      }}>
        <div>Profile Viewers</div>
        <div>40,000</div>
      </div>
      <div style={{ fontSize: 14, marginLeft: 10, display: "flex", justifyContent: "space-between", paddingLeft: 10, paddingRight: 10 }}>
        <div>Post Impressions</div>
        <div>1300</div>
      </div>
    </div>
  </div>

}


export default App
