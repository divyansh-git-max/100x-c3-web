import { useState, useEffect } from 'react';

const style = {
    width: "100%",
    backgroundColor: "#74b9ff",
    height: 50,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 10,
}

const iconStyle = {
    width: 150,
    height: 46,
    borderRadius: 8,
    borderColor: "#636e72",
    borderWidth: 2,
    borderStyle: 'solid',
    cursor: 'pointer',
    backgroundColor: '#81ecec',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
    transition: 'all 0.3s ease',
}

const notificationStyle = {
    width: 20,
    height: 20,
    borderRadius: 50,
    zIndex: 1111,
    position: "absolute",
    top: -8,
    right: -8,
    backgroundColor: '#e90e0eff',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white'
}

export function NavComponent() {
    const [counts, setCounts] = useState(0);
    function incrementCount() {
        setCounts(prev => prev + 1);
    }

    useEffect(() => {
        setInterval(incrementCount, 1000);
    }, []) // this side effect run on the mount because dependency array is empty


    return <div style={style}>
        <div style={iconStyle}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0px 6px 12px rgba(0, 0, 0, 0.3)';
                e.currentTarget.style.backgroundColor = '#00cec9';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.2)';
                e.currentTarget.style.backgroundColor = '#81ecec';
            }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bell-ring-icon lucide-bell-ring"><path d="M10.268 21a2 2 0 0 0 3.464 0" /><path d="M22 8c0-2.3-.8-4.3-2-6" /><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" /><path d="M4 2C2.8 3.7 2 5.7 2 8" /></svg>
        </div>
        <div style={{ ...iconStyle, position: 'relative' }}
            onClick={incrementCount}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0px 6px 12px rgba(0, 0, 0, 0.3)';
                e.currentTarget.style.backgroundColor = '#00cec9';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.2)';
                e.currentTarget.style.backgroundColor = '#81ecec';
            }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bell-ring-icon lucide-bell-ring"><path d="M10.268 21a2 2 0 0 0 3.464 0" /><path d="M22 8c0-2.3-.8-4.3-2-6" /><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" /><path d="M4 2C2.8 3.7 2 5.7 2 8" /></svg>
            <div style={notificationStyle}>{counts}</div>
        </div>
        <div style={iconStyle}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0px 6px 12px rgba(0, 0, 0, 0.3)';
                e.currentTarget.style.backgroundColor = '#00cec9';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.2)';
                e.currentTarget.style.backgroundColor = '#81ecec';
            }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bell-ring-icon lucide-bell-ring"><path d="M10.268 21a2 2 0 0 0 3.464 0" /><path d="M22 8c0-2.3-.8-4.3-2-6" /><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" /><path d="M4 2C2.8 3.7 2 5.7 2 8" /></svg>
        </div>
        <div style={iconStyle}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0px 6px 12px rgba(0, 0, 0, 0.3)';
                e.currentTarget.style.backgroundColor = '#00cec9';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.2)';
                e.currentTarget.style.backgroundColor = '#81ecec';
            }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bell-ring-icon lucide-bell-ring"><path d="M10.268 21a2 2 0 0 0 3.464 0" /><path d="M22 8c0-2.3-.8-4.3-2-6" /><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" /><path d="M4 2C2.8 3.7 2 5.7 2 8" /></svg>
        </div>
    </div>
}