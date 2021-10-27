// import React from 'react';
// import {LineChart, XAxis, YAxis, Grid} from 'react-native-svg-charts';
// import {View, Text} from 'react-native';

// export default class graphScreen extends React.PureComponent {
//   render() {
//     const {Name, DDate, Age} = this.props.route.params;
//     const DATA = [1, 2, 3, 4, 5, Age];
//     const POP = [1, 2, 3, 4, 5, Age];

//     const contentInset = {top: 20, bottom: 20};

//     return (
//       <View style={{flex: 1, padding: 15}}>
//         <Text style={{fontSize: 22}}>Patient Name :{Name}</Text>
//         <Text style={{fontSize: 18}}>Form Submission Time :{DDate}</Text>

//         <View style={{height: 200, flexDirection: 'row'}}>
//           <YAxis
//             data={DATA}
//             contentInset={contentInset}
//             svg={{
//               fill: 'blue',
//               fontSize: 15,
//             }}
//             numberOfTicks={10}
//             formatLabel={value => `${value}`}
//           />
//           <LineChart
//             style={{flex: 1, marginLeft: 16}}
//             data={DATA}
//             svg={{stroke: 'rgb(134, 65, 244)'}}
//             contentInset={contentInset}>
//             <Grid />
//           </LineChart>
//         </View>
//         <XAxis
//           data={POP}
//           contentInset={contentInset}
//           svg={{
//             fill: 'red',
//             fontSize: 15,
//           }}
//           formatLabel={value => `${value}`}
//         />
//       </View>
//     );
//   }
// }
import React from 'react';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import {View, Text} from 'react-native';

export default class graphScreen extends React.PureComponent {
  render() {
    const {Name, DDate, Age} = this.props.route.params;
    const chartConfig = {
      decimalPlaces: 0,
      backgroundGradientFrom: '#1E2923',
      backgroundGradientTo: '#08130D',
      color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
      strokeWidth: 2, // optional, default 3
    };
    const data = {
      labels: ['1', '2', '3', '4', '5', '6', '7', '8'],
      datasets: [
        {
          data: [1, 2, 3, 4, 5, 6, 7, 8],
        },
      ],
    };
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 66,
          padding: 15,
        }}>
        <Text style={{fontSize: 22}}>Patient Name :{Name}</Text>
        <Text style={{fontSize: 18, marginBottom: 10}}>
          {' '}
          Submission Time :{DDate}
        </Text>

        <View style={{height: 200, flexDirection: 'row'}}>
          <LineChart
            data={data}
            width={333}
            height={220}
            chartConfig={chartConfig}
          />
        </View>
      </View>
    );
  }
}
