# Ski-Planner-FE
Frontend for the Ski Planner application

## Dependencies

- Eslint
- Jest
- MaterialUI
- Tailwind
- Vite
- PropTypes
- React

## Example of proptype validation

```js
LegendCard.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default LegendCard;
```

## Material Icons

https://mui.com/material-ui/material-icons/

## Documentation

Please use Doxygen: https://www.doxygen.nl/

example:
```js
/**
 * Card for each entry in the legend
 * To add a new entry, add it to the legendData.js file
 * @param {name} name of the entry
 * @param {icon} url for the path to the icon 
 */
```