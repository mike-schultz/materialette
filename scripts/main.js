const CONTAINER_WIDTH = 370;
const TOOLTIP_WIDTH = 140;
const TOOLTIP_HEIGHT = 40;
const State = {
  output: ['HEX', 'RGB'],
  index: 0,
  tooltipEle: document.getElementById('tooltip'),
  currentColor: null,
  pinnedEle: document.getElementById('pinned'),
  sharedObj: (require('electron').remote).getGlobal('sharedObj')
};
const colors = {
  "red": [
    ["50", "#FFEBEE"],
    ["100", "#FFCDD2"],
    ["200", "#EF9A9A"],
    ["300", "#E57373"],
    ["400", "#EF5350"],
    ["500", "#F44336"],
    ["600", "#E53935"],
    ["700", "#D32F2F"],
    ["800", "#C62828"],
    ["900", "#B71C1C"],
    ["A100", "#FF8A80"],
    ["A200", "#FF5252"],
    ["A400", "#FF1744"],
    ["A700", "#D50000"]
  ],
  "pink": [
    ["50", "#FCE4EC"],
    ["100", "#F8BBD0"],
    ["200", "#F48FB1"],
    ["300", "#F06292"],
    ["400", "#EC407A"],
    ["500", "#E91E63"],
    ["600", "#D81B60"],
    ["700", "#C2185B"],
    ["800", "#AD1457"],
    ["900", "#880E4F"],
    ["A100", "#FF80AB"],
    ["A200", "#FF4081"],
    ["A400", "#F50057"],
    ["A700", "#C51162"]
  ],
  "purple": [
    ["50", "#F3E5F5"],
    ["100", "#E1BEE7"],
    ["200", "#CE93D8"],
    ["300", "#BA68C8"],
    ["400", "#AB47BC"],
    ["500", "#9C27B0"],
    ["600", "#8E24AA"],
    ["700", "#7B1FA2"],
    ["800", "#6A1B9A"],
    ["900", "#4A148C"],
    ["A100", "#EA80FC"],
    ["A200", "#E040FB"],
    ["A400", "#D500F9"],
    ["A700", "#AA00FF"]
  ],
  "deepPurple": [
    ["50", "#EDE7F6"],
    ["100", "#D1C4E9"],
    ["200", "#B39DDB"],
    ["300", "#9575CD"],
    ["400", "#7E57C2"],
    ["500", "#673AB7"],
    ["600", "#5E35B1"],
    ["700", "#512DA8"],
    ["800", "#4527A0"],
    ["900", "#311B92"],
    ["A100", "#B388FF"],
    ["A200", "#7C4DFF"],
    ["A400", "#651FFF"],
    ["A700", "#6200EA"]
  ],
  "indigo": [
    ["50", "#E8EAF6"],
    ["100", "#C5CAE9"],
    ["200", "#9FA8DA"],
    ["300", "#7986CB"],
    ["400", "#5C6BC0"],
    ["500", "#3F51B5"],
    ["600", "#3949AB"],
    ["700", "#303F9F"],
    ["800", "#283593"],
    ["900", "#1A237E"],
    ["A100", "#8C9EFF"],
    ["A200", "#536DFE"],
    ["A400", "#3D5AFE"],
    ["A700", "#304FFE"]
  ],
  "blue": [
    ["50", "#E3F2FD"],
    ["100", "#BBDEFB"],
    ["200", "#90CAF9"],
    ["300", "#64B5F6"],
    ["400", "#42A5F5"],
    ["500", "#2196F3"],
    ["600", "#1E88E5"],
    ["700", "#1976D2"],
    ["800", "#1565C0"],
    ["900", "#0D47A1"],
    ["A100", "#82B1FF"],
    ["A200", "#448AFF"],
    ["A400", "#2979FF"],
    ["A700", "#2962FF"]
  ],
  "lightBlue": [
    ["50", "#E1F5FE"],
    ["100", "#B3E5FC"],
    ["200", "#81D4FA"],
    ["300", "#4FC3F7"],
    ["400", "#29B6F6"],
    ["500", "#03A9F4"],
    ["600", "#039BE5"],
    ["700", "#0288D1"],
    ["800", "#0277BD"],
    ["900", "#01579B"],
    ["A100", "#80D8FF"],
    ["A200", "#40C4FF"],
    ["A400", "#00B0FF"],
    ["A700", "#0091EA"]
  ],
  "teal": [
    ["50", "#E0F2F1"],
    ["100", "#B2DFDB"],
    ["200", "#80CBC4"],
    ["300", "#4DB6AC"],
    ["400", "#26A69A"],
    ["500", "#009688"],
    ["600", "#00897B"],
    ["700", "#00796B"],
    ["800", "#00695C"],
    ["900", "#004D40"],
    ["A100", "#A7FFEB"],
    ["A200", "#64FFDA"],
    ["A400", "#1DE9B6"],
    ["A700", "#00BFA5"]
  ],
  "cyan": [
    ["50", "#E0F7FA"],
    ["100", "#B2EBF2"],
    ["200", "#80DEEA"],
    ["300", "#4DD0E1"],
    ["400", "#26C6DA"],
    ["500", "#00BCD4"],
    ["600", "#00ACC1"],
    ["700", "#0097A7"],
    ["800", "#00838F"],
    ["900", "#006064"],
    ["A100", "#84FFFF"],
    ["A200", "#18FFFF"],
    ["A400", "#00E5FF"],
    ["A700", "#00B8D4"]
  ],
  "green": [
    ["50", "#E8F5E9"],
    ["100", "#C8E6C9"],
    ["200", "#A5D6A7"],
    ["300", "#81C784"],
    ["400", "#66BB6A"],
    ["500", "#4CAF50"],
    ["600", "#43A047"],
    ["700", "#388E3C"],
    ["800", "#2E7D32"],
    ["900", "#1B5E20"],
    ["A100", "#B9F6CA"],
    ["A200", "#69F0AE"],
    ["A400", "#00E676"],
    ["A700", "#00C853"]
  ],
  "lightGreen": [
    ["50", "#F1F8E9"],
    ["100", "#DCEDC8"],
    ["200", "#C5E1A5"],
    ["300", "#AED581"],
    ["400", "#9CCC65"],
    ["500", "#8BC34A"],
    ["600", "#7CB342"],
    ["700", "#689F38"],
    ["800", "#558B2F"],
    ["900", "#33691E"],
    ["A100", "#CCFF90"],
    ["A200", "#B2FF59"],
    ["A400", "#76FF03"],
    ["A700", "#64DD17"]
  ],
  "lime": [
    ["50", "#F9FBE7"],
    ["100", "#F0F4C3"],
    ["200", "#E6EE9C"],
    ["300", "#DCE775"],
    ["400", "#D4E157"],
    ["500", "#CDDC39"],
    ["600", "#C0CA33"],
    ["700", "#AFB42B"],
    ["800", "#9E9D24"],
    ["900", "#827717"],
    ["A100", "#F4FF81"],
    ["A200", "#EEFF41"],
    ["A400", "#C6FF00"],
    ["A700", "#AEEA00"]
  ],
  "yellow": [
    ["50", "#FFFDE7"],
    ["100", "#FFF9C4"],
    ["200", "#FFF59D"],
    ["300", "#FFF176"],
    ["400", "#FFEE58"],
    ["500", "#FFEB3B"],
    ["600", "#FDD835"],
    ["700", "#FBC02D"],
    ["800", "#F9A825"],
    ["900", "#F57F17"],
    ["A100", "#FFFF8D"],
    ["A200", "#FFFF00"],
    ["A400", "#FFEA00"],
    ["A700", "#FFD600"]
  ],
  "amber": [
    ["50", "#FFF8E1"],
    ["100", "#FFECB3"],
    ["200", "#FFE082"],
    ["300", "#FFD54F"],
    ["400", "#FFCA28"],
    ["500", "#FFC107"],
    ["600", "#FFB300"],
    ["700", "#FFA000"],
    ["800", "#FF8F00"],
    ["900", "#FF6F00"],
    ["A100", "#FFE57F"],
    ["A200", "#FFD740"],
    ["A400", "#FFC400"],
    ["A700", "#FFAB00"]
  ],
  "orange": [
    ["50", "#FFF3E0"],
    ["100", "#FFE0B2"],
    ["200", "#FFCC80"],
    ["300", "#FFB74D"],
    ["400", "#FFA726"],
    ["500", "#FF9800"],
    ["600", "#FB8C00"],
    ["700", "#F57C00"],
    ["800", "#EF6C00"],
    ["900", "#E65100"],
    ["A100", "#FFD180"],
    ["A200", "#FFAB40"],
    ["A400", "#FF9100"],
    ["A700", "#FF6D00"]
  ],
  "deepOrange": [
    ["50", "#FBE9E7"],
    ["100", "#FFCCBC"],
    ["200", "#FFAB91"],
    ["300", "#FF8A65"],
    ["400", "#FF7043"],
    ["500", "#FF5722"],
    ["600", "#F4511E"],
    ["700", "#E64A19"],
    ["800", "#D84315"],
    ["900", "#BF360C"],
    ["A100", "#FF9E80"],
    ["A200", "#FF6E40"],
    ["A400", "#FF3D00"],
    ["A700", "#DD2C00"]
  ],
  "grey": [
    ["50", "#FAFAFA"],
    ["100", "#F5F5F5"],
    ["200", "#EEEEEE"],
    ["300", "#E0E0E0"],
    ["400", "#BDBDBD"],
    ["500", "#9E9E9E"],
    ["600", "#757575"],
    ["700", "#616161"],
    ["800", "#424242"],
    ["900", "#212121"]
  ],
  "blueGrey": [
    ["50", "#ECEFF1"],
    ["100", "#CFD8DC"],
    ["200", "#B0BEC5"],
    ["300", "#90A4AE"],
    ["400", "#78909C"],
    ["500", "#607D8B"],
    ["600", "#546E7A"],
    ["700", "#455A64"],
    ["800", "#37474F"],
    ["900", "#263238"]
  ],
  "brown": [
    ["50", "#EFEBE9"],
    ["100", "#D7CCC8"],
    ["200", "#BCAAA4"],
    ["300", "#A1887F"],
    ["400", "#8D6E63"],
    ["500", "#795548"],
    ["600", "#6D4C41"],
    ["700", "#5D4037"],
    ["800", "#4E342E"],
    ["900", "#3E2723"]
  ]
};

// Populate color cells
const container = document.getElementById('container');
for (let name in colors) {
  const row = document.createElement('section');
  row.className = 'row';
  colors[name].forEach((val, idx) => {
    //Append the color cell
    const cell = createCell(val[0], val[1]);
    row.appendChild(cell);
    //Create the gutter cell from the 500 series
    if (val[0] === '500') {
      row.insertBefore(createCell(val[0], val[1], true, name), row.childNodes[0]);
    }
  })
  container.appendChild(row);
}

function createCell(series, color, isGutter, name) {
  const cell = document.createElement('div');
  cell.className = 'cell color';
  if (isGutter) {
    cell.innerHTML = `<span>${name}</span>`;
    cell.className += ' gutter';
  }
  cell.setAttribute('data-series', series);
  cell.style.backgroundColor = color;
  cell.style.color = luminance(color, '#fff', '#444');
  return cell;
}

// Track tooltip movement and display a color + info
document.body.addEventListener('mousemove', e => {
  const tooltip = State.tooltipEle;
  let node;
  if (e.target.className.indexOf('color') > -1) {
    node = e.target;
  } else if (e.target.parentNode.className.indexOf('color') > -1) {
    node = e.target.parentNode;
  } else {
    tooltip.className = "hidden";
    State.currentColor = null;
    return;
  }

  const rgb = node.style.backgroundColor;
  const series = node.getAttribute('data-series');
  const match = /rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/.exec(rgb);
  let hex = rgbToHex(match[1], match[2], match[3]);

  let output;
  switch (State.output[State.index]) {
    case 'RGB':
      value = rgb;
      break;
    case 'HEX':
      value = hex;
      break;
  }
  tooltip.style.backgroundColor = value;
  tooltip.innerHTML = `<span style='font-size:1.2em'>${value}</span>${series}`;

  tooltip.style.color = luminance(hex, '#fff', '#000');
  State.currentColor = value;

  // Adjust bounds of tooltip to avoid edge bleeding
  let offsetX = e.clientX - TOOLTIP_WIDTH / 2;
  let offsetY = e.clientY - TOOLTIP_HEIGHT - 10;
  if (offsetX < 0) {
    offsetX = e.clientX + 30;
  } else if (offsetX > CONTAINER_WIDTH - TOOLTIP_WIDTH) {
    offsetX -= 65;
  }
  if (offsetY < 0) {
    offsetY = e.clientY + 25;
  }
  tooltip.style.top = offsetY + 'px';
  tooltip.style.left = offsetX + 'px';
  tooltip.className = "";
});

// Copy the user's selected color to the clipboard
document.body.addEventListener('click', e => {
  if (State.currentColor !== null) {
    const clipboard = document.getElementById('clipboard');
    let output;
    clipboard.innerHTML = output = State.currentColor;
    clipboard.select();
    try {
      var successful = document.execCommand('copy');
      document.getElementById('color-copied').innerHTML = output;
      const curtain = document.getElementById('curtain');
      curtain.className = "";
      setTimeout(function() {
        curtain.className = "hidden";
      }, 1000);
    } catch (err) {
      console.log(err);
    }
  }
});

document.onkeydown = e =>{
    if(e.keyCode === 27) {
      hideApp();
    }
};

/**
 * Toggle between HEX or RGB for the tooltip + copy
 */
function changeOutput() {
  State.index++;
  if (State.index === State.output.length) {
    State.index = 0;
  }
  document.getElementById('current-output').innerHTML = State.output[State.index];
}

function closeApp() {
  State.sharedObj.quit()
}
function hideApp() {
  State.sharedObj.hide();
}
function togglePinned() {
  State.sharedObj.pinned = State.pinnedEle.checked;
}

/** Utilities **/
function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) + (parseInt(r) << 16) + (parseInt(g) << 8) + parseInt(b)).toString(16).slice(1);
}

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function luminance(sHexColor, sLight, sDark) {
  const oRGB = hexToRgb(sHexColor);
  const yiq = ((oRGB.r * 299) + (oRGB.g * 587) + (oRGB.b * 114)) / 1000;
  return (yiq >= 128) ? sDark : sLight;
}
