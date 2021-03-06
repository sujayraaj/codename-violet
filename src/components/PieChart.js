import React from 'react';

class PieChart extends React.PureComponent {
    constructor(props){
        super(props);
        this.alternate = true;
    }
    calculatePos(width, height, radius, theta) {
        return [(width / 2.0 + (radius * (Math.sin(theta)))),
            (height / 2.0 - (radius * (Math.cos(theta))))];
    }
    calculatePath() {
        const { width, height } = { ...this.props };
        let radius;
        if(this.alternate){
            radius = this.props.radius;
        } else {
            radius = 1.2 * this.props.radius;
        }
        this.alternate = !this.alternate;
        console.log('ALTERNATE');
        console.log(this.alternate);
        this.theta = 0;
        this.currentPos = this.calculatePos(width, height, radius, this.theta);
        const pathData = this.props.pieData.reduce((acc, curr, ind) => {
            if(this.alternate){
                radius = this.props.radius;
            } else {
                radius = 1.2 * this.props.radius;
            }
            this.alternate = !this.alternate;
                this.theta += (curr.value / 100) * 2 * Math.PI;
            const nextPos = this.calculatePos(width, height, radius, this.theta);
            const isBigCurveInt = (curr.value / 100) > 0.5 ? 1 : 0;
            console.log(isBigCurveInt);
            const path = <path
                d={`M${+width / 2} ${+height / 2} L ${this.currentPos[0]} ${this.currentPos[1]} A ${radius} ${radius} 0 ${isBigCurveInt} 1 ${nextPos[0]} ${nextPos[1]} L ${width / 2.0} ${height / 2.0}`}
                fill={curr.color}
                fillOpacity={curr.opacity}
                key={ind}
            />;
            this.currentPos = nextPos;
            acc.push(path);
            return acc;
        }, []);
        return pathData;
    }
    render() {
        return (
            <svg id="pieSVG" height={this.props.height} width={this.props.width}>
                {this.calculatePath()}
            </svg>
        );
    }
} 
  
  
export default PieChart;