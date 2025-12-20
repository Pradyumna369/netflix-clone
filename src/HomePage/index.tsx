import Header from "../Header";
const HomePage = () => {
    return(
       <> 
        <Header/> 
        <>
            This is home page
            <p>
				Each and every modern webpage that we create today tend to have
				user interactions. When the user interacts with the web
				application events are fired. That event can be a mouse click, a
				keypress, or something rare like connecting the battery with a
				charger. From the developer side, we need to ‘listen’ to such
				events and then make our application respond accordingly. This
				is called event handling that provides a dynamic interface to a
				webpage. Like JavaScript DOM, React also provides us some
				built-in methods to create a listener that responds accordingly
				to a specific event.Now we will look at certain rules to keep in
				mind while creating events in React. camelCase Convention:
				Instead of using lowercase we use camelCase while giving names
				of the react events. That simply means we write ‘onClick’
				instead of ‘onclick’. Pass the event as a function: In React we
				pass a function enclosed by curly brackets as the event listener
				or event handler, unlike HTML where we pass the event handler or
				event listener as a string. Prevent the default: Just returning
				false inside the JSX element does not prevent the default
				behavior in react. Instead, we have to call the ‘preventDefault’
				method directly inside the event handler function. Each and
				every modern webpage that we create today tend to have user
				interactions. When the user interacts with the web application
				events are fired. That event can be a mouse click, a keypress,
				or something rare like connecting the battery with a charger.
				From the developer side, we need to ‘listen’ to such events and
				then make our application respond accordingly. This is called
				event handling that provides a dynamic interface to a webpage.
				Like JavaScript DOM, React also provides us some built-in
				methods to create a listener that responds accordingly to a
				specific event.Now we will look at certain rules to keep in mind
				while creating events in React. camelCase Convention: Instead of
				using lowercase we use camelCase while giving names of the react
				events. That simply means we write ‘onClick’ instead of
				‘onclick’. Pass the event as a function: In React we pass a
				function enclosed by curly brackets as the event listener or
				event handler, unlike HTML where we pass the event handler or
				event listener as a string. Prevent the default: Just returning
				false inside the JSX element does not prevent the default
				behavior in react. Instead, we have to call the ‘preventDefault’
				method directly inside the event handler function.
			</p>
        </>
       </> 
    )
}

export default HomePage;