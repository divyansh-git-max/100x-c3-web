
const style = {
    width: 250,
    backgroundColor: "white",
    borderRadius: 10,
    borderColor: "gray",
    borderWidth: 1,
    padding: 20,
    margin: 10,
};



export function PostComponent({ Name, time, subtitle, image }) {
    return <div style={style}>
        <div style={{
            display: "flex",
            justifyContent: "space-around"
        }}>
            <img src={image}
                style={{
                    width: 50,
                    height: 50,
                    borderRadius: 50
                }}
            />
            <div style={{ fontsize: 14, marginLeft: 10 }}>
                <b>
                    {Name}
                </b>
                <div>{subtitle}</div>
                {(time !== undefined) ? <div style={{ display: "flex" }}>
                    <div>{time}</div>
                    <div style={{ marginLeft: 10 }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clock-icon lucide-clock"><path d="M12 6v6l4 2" /><circle cx="12" cy="12" r="10" /></svg>
                    </div>
                </div> : null}
            </div>
        </div>
        <div style={{ fontSize: 14, marginLeft: 10, width: "100%" }}>
            What to know how to win big? Check out how these folks won $6000 in bounties.
        </div>
    </div>
}

