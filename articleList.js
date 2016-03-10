import React, {
  View,
  Text,
  ListView,
  TextInput,
  Component,
  StyleSheet,
  WebView
} from 'react-native';

var DOMParser = require('xmldom').DOMParser

let styles = {
    rowStyle:{
        fontSize: 15,
        padding: 10

    },
    rowStyleHeighlighted:{
        fontWeight: 'bold',
        fontSize: 20,
        backgroundColor: '#D7EDFF',
        padding: 10

    }
}

class FeedItemListEntry extends Component { 

    render() { return (<View key={this.props.url} >
                <Text style={styles.rowStyle} onPress={()=>{
                this.props.navigator.push({
                    component: WebView,
                    title: this.props.title,
                    passProps: {
                        scalesPageToFit: true,
                        loading: true,
                        source: { url: this.props.link }
                    }
                })
            }
        }>
            {this.props.title}
            </Text> 
            </View>)
        }
}

//XML is not JSCore's strong suit.
const fetchFeedItems = (url) => {
    return fetch(url)
            .then(response => response.text())
            .then(text => new DOMParser().parseFromString(text))
            .then(xml => {

                var items = []
                let nodes = xml.documentElement.getElementsByTagName('entry')

                for(var i = 0; i < nodes.length; i++) {
                    var element = nodes[i]
                    
                    let item = {
                        title: '',
                        url: ''
                    }

                    let titles = element.getElementsByTagName('title')
                    if(titles[0]){
                        item.title = titles[0].textContent
                    }
                    let links = element.getElementsByTagName('link')
                    if(links[0]){
                        item.link = links[0].getAttribute('href')
                    }

                    items.push(item)
                }

                return items
            })
}
export default class ArticleList extends Component {
    constructor(props) {
        super(props)
        this.state = props
        fetchFeedItems(this.state.feedUrl)
            .then(items => {
                var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});               
                this.setState({feedItems: ds.cloneWithRows(items)})
            })
            .catch(error => {
                this.setState({error:error})
            })
    }
    render(){
        var sectionid = 0;

        //let's go load the feed and then render.
        var content = <View>
            <Text>We're just about to load this feed:</Text>
            <Text>{this.state.feedUrl}</Text>
        </View>

        if(this.state.feedItems){
            content = <ListView dataSource={this.state.feedItems} renderRow={(data, rowid, sectionid, highlight) =>{
                return <FeedItemListEntry {...this.props} {...data} /> }
            }
            renderSeparator={()=><View key={sectionid++} style={{height:1, backgroundColor:'lightblue'}}/>}
            />
        }

        return (
            <View style={{flex:1, justifyContent: 'flex-start', paddingTop: 64}} >
                {content}
            </View>
        )
    }
}