export const ErrorPage: React.FC = () => {
  return (
    <div
      style={{
        height: '100vh',
        maxHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <h1
        style={{
          margin: '0',
          marginTop: '70px',
          fontSize: '60px',
          fontWeight: 'bold',
          textAlign: 'center',
        }}
      >404</h1>
      <h2
        style={{
          margin: '0',
          marginTop: '20px',
          fontSize: '40px',
          fontWeight: 'bold',
          textAlign: 'center',
        }}
      >Page Not Found!</h2>
      <p
        style={{
          margin: '0',
          marginTop: '10px',
          fontSize: '20px',
          textAlign: 'center',
          padding: '0 40px',
        }}
      >We're sorry, the page you request could not be found. Please go back to the home!</p>
      <img
        style={{
          maxWidth: '100vw',
          textAlign: 'center',
        }}
       src="/ErrorRobot.png" alt="一个拔了插头的机器人" />
       <div
        style={{
          textAlign: 'center',
          flexGrow: 1,
        }}
       ></div>
       <div
        style={{
          width: '100vw',
          height: '120px',
          backgroundColor: '#364a8d',
          display: 'flex',
          flexDirection: 'column',
        }}
       >
        <div
          style={{
            height: '40px',
            borderBottomLeftRadius: '40px',
            backgroundColor: '#fff',
          }}
       ></div>
        <div
          style={{
            padding: '0 40px',
            display: 'flex',
            alignItems: 'center',
            flexGrow: 1,
          }}
       >
          <div
            style={{
              textAlign: 'center',
              height: '40px',
              backgroundColor: '#fff',
              fontSize: '28px',
              flexGrow: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontWeight: 'bold',
              borderRadius: '10px',
              cursor: 'pointer',
            }}
          > Go Home
       </div>
       </div>
      </div>
    </div>
  )
}
