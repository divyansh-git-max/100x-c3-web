
const profileCardStyle = {
    width: 250,
    height: 250,
    backgroundColor: "white",
    borderRadius: 10,
    borderColor: "gray",
    borderWidth: 1,
    margin: 10
}



export function ProfileCard() {
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
