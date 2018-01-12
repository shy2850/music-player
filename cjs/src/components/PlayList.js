import React from './../react.js';
export default class extends React.Component {
    onChange(index) {
        const { current, onChange } = this.props;
        if (onChange && index !== current)
            onChange(index);
    }
    componentDidMount() {
        const { init } = this.props;
        init && init();
    }
    render() {
        const { current, list = [] } = this.props;
        const onChange = this.onChange.bind(this);
        return React.createElement("table", { className: "table is-hoverable playlist" },
            React.createElement("thead", null,
                React.createElement("tr", null,
                    React.createElement("th", null, "\u5E8F\u53F7"),
                    React.createElement("th", null, "\u6B4C\u66F2"),
                    React.createElement("th", null, "\u6B4C\u624B"),
                    React.createElement("th", null, "\u65F6\u957F"))),
            React.createElement("tbody", null, list.map((song, i) => React.createElement("tr", { className: current === i ? 'is-selected' : current, key: `${i}`, onClick: () => onChange(i) },
                React.createElement("td", null,
                    i + 1,
                    "."),
                React.createElement("td", null, song.get('songname')),
                React.createElement("td", null, song.get('singername')),
                React.createElement("td", null, song.get('playTime'))))));
    }
}
