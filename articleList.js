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

export default class ArticleList extends Component {
    constructor(props) {
        super(props)
        this.state = props
        fetch(this.state.feedUrl)
            .then(response => response.text())
            .then(text => new DOMParser().parseFromString(text))
            .then(xml => {

                var items = []
                let nodes = xml.documentElement.getElementsByTagName('entry')

                for(var i = 0; i < nodes.length; i++) {
                    var element = nodes[i]
                    
                    let item = {
                        title: '',
                        url: '',
                        key: i
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
            .then(items => {
                var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});               
                this.setState({feedItems: ds.cloneWithRows(items)})
            })
            .catch(error => {
                this.setState({error:error})
            })
    }
    render(){
        //let's go load the feed and then render.
        var content = <View>
            <Text>We're just about to load this feed:</Text>
            <Text>{this.state.feedUrl}</Text>
        </View>

        if(this.state.feedItems){
            content = <ListView dataSource={this.state.feedItems} renderRow={(data, rowid, sectionid) => <Text key={data.rowid} style={styles.rowStyle} onPress={()=>{
                this.props.navigator.push({
                    component: WebView,
                    title: data.title,
                    passProps: {
                        scalesPageToFit: true,
                        loading: true,
                        source: { url: data.link }
                    }
                })
            }}>{data.title}</Text> } 
            renderSeparator={()=><View style={{height:1, backgroundColor:'lightgray'}}/>}
            />
        }

        return (
            <View style={{flex:1, justifyContent: 'flex-start', paddingTop: 64}} >
                {content}
            </View>
        )
    }
}