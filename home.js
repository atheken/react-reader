import React, {
  View,
  Text,
  TextInput,
  Component,
  StyleSheet
} from 'react-native';

import ArticleList from './articleList.js'

const styles = StyleSheet.create({
  	container: {
	    flex: 1,
	    justifyContent: 'center',
	    //alignItems: 'stretch',
	    padding: 20
  	},
  	feedInput: {
		height: 40,
		borderColor: 'lightgray',
		borderWidth: 1,
		color: '#555',
		borderRadius: 5,
		padding: 5
	},
	instructions: {
		color: 'gray',
		marginBottom: 5
	},
	disabledButton : {
		marginTop: 10,
		padding: 10,
		textAlign: 'center',
		borderWidth: 1,
		borderColor: 'lightblue',
		color: 'lightblue',
		borderRadius: 5
	},
	enabledButton : {
		marginTop: 10,
		padding: 10,
		textAlign: 'center',
		borderWidth: 1,
		borderColor: '#4AA4F5',
		color: '#4AA4F5',
		fontWeight: 'bold',
		borderRadius: 5,
		backgroundColor:'#C8E0F5',
		overflow: 'hidden'
		
	}
});


export default class Home extends Component {
	constructor(props) {
		super(props)
		this.state = {feedUrl:'https://reddit.com/r/cats/.rss', isValid: true, ...props}
	}
 	render() {
 		return (
		<View style={styles.container} >
			<Text style={styles.instructions}>
				Fetch an RSS feed:
			</Text>
			<TextInput autoCorrect={false} 
				autoCapitalize='none'
				value={this.state.feedUrl}
			 	style={styles.feedInput} 
			 	placeholder="https://reddit.com/r/cats/.rss" 
			 	onChangeText={(text) => this.setState({
		 			feedUrl:text,
		 			isValid: /^https:\/\/.+/.test(text)
		 		})}
			/>
			<Text 
			style={this.state.isValid ? styles.enabledButton : styles.disabledButton }
			onPress={()=>{
				if(this.state.isValid){
					this.props.navigator.push({
						component: ArticleList,
						title:"Read Feed",
				        passProps: {
            				feedUrl: this.state.feedUrl
          				}
					})
				}
			}}
			>Load Feed</Text>
		</View>
	);}
}
