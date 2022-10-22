import React from 'react'
import { FlatList, Image, NativeModules, RefreshControl, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { useProductCart } from './productCartHooks'
import { useProgress } from './progressHooks'


const Progress = () => {
  const { percentage, progress, startProgress, interval, setProgress } = useProgress()

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (percentage >= 100) {
          clearInterval(interval.current)
          setProgress(0)
          startProgress(0)
        }
      }}
      onPressIn={() => clearInterval(interval.current)}
      onPressOut={() => {
        clearInterval(interval.current)
        startProgress(progress)
      }}>
      <View style={{ flexDirection: 'row', backgroundColor: '#D8D9CF', height: 56 }}>
        <View style={{ height: 56, flex: progress / 1000, backgroundColor: '#CDFCF6' }} />
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
          <Text>{percentage === 100 ? "Tap untuk mengulang" : `Loading ${percentage}%`}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const DeviceID = () => {
  const [deviceId, setDeviceId] = React.useState('')
  NativeModules.AlamiModule.getDeviceId(setDeviceId)
  return (
    <View style={{ padding: 16 }}>
      <Text>Device ID kamu: {deviceId}</Text>
    </View>
  )
}

const ProductCart = () => {
  const { products, addToCart, cart, deleteFromCart, summary, loading, getProducts } = useProductCart()

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        contentContainerStyle={{ padding: 16 }}
        data={products}
        keyExtractor={(_, idx) => idx.toString()}
        ListEmptyComponent={() => {
          if (!loading && !products) {
            return <Text>Terjadi kesalahan, tarik kebawah untuk memuat ulang.</Text>
          }
          return null
        }}
        ItemSeparatorComponent={() => <View style={{ marginVertical: 4 }} />}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const wasAddedToCart = cart.findIndex(id => item.id == id) !== -1
          const buttonText = wasAddedToCart ? "Hapus dari keranjang" : "Tambah ke keranjang"
          const buttonColor = wasAddedToCart ? "#eee" : "#EA047E"
          const buttonTextColor = wasAddedToCart ? "black" : "white"
          return (
            <View style={{ flexDirection: 'row', flex: 1, padding: 12, borderRadius: 8, backgroundColor: '#fff', alignItems: 'center' }}>
              <Image source={{ uri: item.image }} style={{ height: 56, width: 56, resizeMode: 'center' }} />
              <View style={{ marginHorizontal: 8 }} />
              <View style={{ flex: 1, paddingVertical: 4, justifyContent: 'space-between' }}>
                <View>
                  <Text style={{ fontWeight: 'bold' }}>
                    {item.title}
                  </Text>
                  <Text style={{ marginTop: 4 }}>${item.price}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ backgroundColor: "orange", borderRadius: 2, color: "#fff", paddingHorizontal: 4, fontSize: 12 }}>
                      {item.rating.rate}
                    </Text>
                    <View style={{ marginHorizontal: 4 }} />
                    <Text style={{ fontSize: 12 }}>Terjual : {item.rating.count}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      if (wasAddedToCart) {
                        deleteFromCart(item)
                      } else {
                        addToCart(item)
                      }
                    }}
                    style={{ alignSelf: 'flex-end', backgroundColor: buttonColor, padding: 8, borderRadius: 4 }}
                  >
                    <Text style={{ fontSize: 12, color: buttonTextColor }}>{buttonText}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )
        }}
        refreshControl={<RefreshControl onRefresh={getProducts} refreshing={loading} />}
      />
      <View style={{ backgroundColor: '#cdfcf6', padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View>
          <Text>Total Belanja {cart.length > 0 && <Text>: {cart.length} product</Text>}</Text>
          <View style={{ marginVertical: 2 }} />
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>${summary.totalBelanja.toFixed(2)}</Text>
        </View>
        <View>
          <TouchableOpacity style={{ backgroundColor: "#EA047E", paddingVertical: 8, paddingHorizontal: 16, borderRadius: 4 }}>
            <Text style={{ color: "white", fontSize: 16, fontWeight: 'bold' }}>Checkout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const App = () => {
  return (
    <View style={{ flex: 1, backgroundColor: '#eee' }}>
      <Progress />
      <DeviceID />
      <ProductCart />
    </View>
  )
}

export default App