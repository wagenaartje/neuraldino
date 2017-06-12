![NeuralDino](http://i.imgur.com/MH49gP7.png)

Neuraldino is an AI for Google's t-rex game. It is written in Javascript and uses the [synaptic.js](https://github.com/cazala/synaptic) module for creation and utilisation of neural networks. The source code of the game is retrieved from [this](https://github.com/wayou/t-rex-runner) repository. Feel free to fork this project.

*Please note that ducking is not possible in my version of the game, yet*

### How to use as a user
Very simple. Just visit [wagenaartje.github.io/neuraldino](https://wagenaartje.github.io/neuraldino/). Press spacebar to play the game. Once some obstacles in sight you will be adding data to the training sets. Try to have a minimal size of 500, and try not to exceed 5000. Once you are done gathering data, press the **Train!** button. This will train your sets to the neural network 100 times. Train until you have an error of `<0.03`. After you're done training, toggle the *receiving data* button. Now press spacebar, and the AI will take over control.

Does your AI reach a reasonable score? Then **export** your network, so you can show it off anytime later!

### How to use as a programmer

The repository is not very open to adjustment yet. Soon I will be transforming the code to object-oriented design, this will create more overview and thus make editing easier. 
