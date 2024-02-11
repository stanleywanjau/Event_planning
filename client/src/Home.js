function  Home(){
  function switchtoevents(){
    return window.location.pathname='/events'
  }
  // console.log(querystring())
  return(
    <section id="hero">
        {/* <h1>{windows('home page')}</h1> */}
          <img src="https://i.pinimg.com/564x/48/77/7e/48777ee2174668d5321c8813e59eb58a.jpghttps://i.pinimg.com/564x/48/77/7e/48777ee2174668d5321c8813e59eb58a.jpg" alt="Beautifully decorated event venue" />
          <h1>Transforming Your Vision into Unforgettable Events</h1>
          <p>Welcome to Eventful Moments, where we specialize in crafting exceptional experiences tailored to your unique vision. Let us turn your dreams into reality.</p>
      {/* <button onClick={switchtoevents}>events</button> */}
        </section>
  )
}

export default Home