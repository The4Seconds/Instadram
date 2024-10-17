import  { View }  from "react-native";

function SquareContainer ({ children }) {
    return (
        <View style={{
            backgroundColor:'white',
            minHeight: 50,

        }}>
        { children }
        </View>    
    )
}
export default SquareContainer