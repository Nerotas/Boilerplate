# Themes and Styles

## Theme

This folder contains the global theme for the app. Our theme is built using MUI's theming guide.

https://mui.com/material-ui/customization/theming/

## Styles

One-off styles are handled case by case. Usually, a single small change is handled using the components `sx` property.

```
<Tyopgraphy sx={{fontSize: "15px"}}>My Text</Typography>
```

Something more complex or used by mulitple compenets should be added to a `.scss` file and imported as class.

```
import 'style.scss';

export const MyComponent = () => <Typography className="bigText">My Text</Typography>
```

## Over Writting Global Theme

In some cases, the global theme needs some elements to be overwritten. Creating a new theme will overwrite ALL styles from the global. We use the `sx` property to overwrite only the elements that we want. The object used is the same type as the Theme.

```
<Button sx={{
    palette: {
        primary: {
            main: '#EBF6F9',
            contrastText: '#333',
        },
    }
}}>Click Me</Button>
```
