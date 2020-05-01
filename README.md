# jAnim v1.0
Developed by: Abhay Kumar Singh, Tusar Das

Date: 27-May-2012

### Introduction

jAnim is a JavaScript animation library developed based on jQuery. It provides useful inbuilt features to empower front-end developers with animation effects. This library consists of only Javascript, it does not require any CSS styles to make the animation work. Thus making it pretty easy to implement by developers. This was a hackathon project. Myself (Tusar) and Abhay created this jQuery based animation plugin back in 2012. Please checkout the features section for demo links.

### Dependencies

Before using jAnim plugin you should add the jQuery-1.7.2 library.

### Browser Support

jAnim supports major browsers like Firefox, Google chrome, IE7/8.

# Features

## 1. Emphasis

Emphasizes the target element.

#### Demo Link
https://plnkr.co/edit/JDCKbcrBy6kobCoR

#### Syntax
<pre>
jQuery(".target").jAnim("emphasis", {
    "duration": 500,
    "width": "60%",
    "fontSize": "3em"
});
</pre>
#### Parameters

* duration: Defines the duration of the animation in milliseconds, default (if not mentioned) is 1000
* width: Defines the percentage of increment of target element, default (if not mentioned) is “70%”
* fontSize: Defines the increment of size of font after animation , default (if not mentioned) is “3em”
* callback: Specifies the function to be called when animation complete.


## 2. Fly In

Target appears on the screen flying.

#### Demo Link
https://plnkr.co/edit/QBB3psUNnvZ8At86

#### Syntax
<pre>
jQuery(".target").jAnim("flyIn", {
    "speed": "slow"
});
</pre>

#### Parameters

* speed: Defines the speed of the animation , default (if not mentioned) is slow. Options: slow,  medium, fast
* callback: Specify the function when animation complete.

## 3. Fly Out

jQuery component that takes the text from a `<div>` and make it fly out from the screen. 

#### Demo Link
https://plnkr.co/edit/u4ErpdkpfX7XMl5l

#### Syntax
<pre>
jQuery(".target").jAnim("flyOut", {
    "speed": "slow"
});
</pre>

#### Parameters

* speed: Defines the speed of the animation , default (if not mentioned) is slow. Options: slow,  medium, fast
* callback: Specify the function when animation complete.

## 4. Pinwheel

Spins the target. 

#### Demo Link
https://plnkr.co/edit/59xkLwZfLxfxro9d

#### Syntax
<pre>
jQuery(".target").jAnim("pinwheel", {
    "speed" : "slow"
});
</pre>

#### Parameters

* speed: Defines the speed of the rotation , default (if not mentioned) is slow. Options: slow,  medium, fast.
* callback: Specify the function when pin wheel complete.

## 5. Ticker Text

Adds typing effect to your texts.

#### Demo Link
https://plnkr.co/edit/xYjtesbCS6ml0Tp9

#### Syntax
<pre>
jQuery(".child").jAnim("tickerText", {
    "speed": 800,
    "content": "Thanks for trying this out -the jAnim Team",
    "overwrite": true
});   
</pre>

#### Parameters

* speed: Defines the speed of the writting , default (if not mentioned) is 1000.
* content: Provide the text content for writing. default (if not mentioned) is "The jAnim Team".  
* overwrite: Set the existing content should overwrite or not.  default (if not mentioned) is  false.
* callback: Specify the function when ticker text complete.

## 6. Scatter Out

Scatters out text from the target one by one.

#### Demo Link
http://jsfiddle.net/tusar/h237ngfj

#### Syntax
<pre>
jQuery(".child").jAnim("scatterout", {
    "speed": "fast"
});   
</pre>

#### Parameters

* speed: Defines the duration of the animation. Expected values “slow”, “fast”. Default value “slow”

## 7. Dropin

Drops text on the target one by one.

#### Demo Link
http://jsfiddle.net/tusar/bh5a79zc/3/

#### Syntax
<pre>
jQuery(".target").jAnim("dropin", {
    "speed": "fast"
});   
</pre>

#### Parameters
* speed: Defines the duration of the animation. Expected values "slow", "fast". Default value "slow"

## 8. Popin

Blink the html component. 

#### Demo Link
http://jsfiddle.net/tusar/1o3d6w0L/2/

#### Syntax
<pre>
jQuery(".target").jAnim("popin", {
    "duration" : 1200
});
</pre>

#### Parameters
* speed : Defines the speed of the blink , default (if not mentioned) is 1000.
* callback: Specify the function when blink complete.
