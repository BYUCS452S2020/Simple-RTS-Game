# Simple-RTS-Game
##### Team:
Jacob (The Great) Walker, Norberto (The Mighty) Martinez, and Michael (The Wizard) Black

## Project Pitch

see the project pitch [here](https://github.com/BYUCS452S2020/Simple-RTS-Game/blob/master/Project%20Pitch%20CS%20452.pdf)

## Database Schemas

#### User

user (<ins>user_id</ins>, username, password, salt, first_name, last_name, email, avatar_id)

* Foreign Key avatar_id references avatar

Contains user information for login

#### Avatar

avatar (<ins>avatar_id</ins>, happy, mad, mocking)

Contains sprite images for avatar emotions

#### Inventory

inventory (<ins>inventory_id</ins>, owner, wood, stone, gold)

* Foreign Key owner references user

Keeps running totals of each players resources

#### Troop

troop (<ins>troop_id</ins>, owner, name, type, location_x, location_y, health, speed, attack)

* Foreign Key owner references user

Holds information for each troop created, including who they belong to

#### Building

building (<ins>building_id</ins>, owner, location_x, location_y,  health, name)

* Foreign Key owner references user

Holds information for buildings/structures on the map

#### Resource

resource (<ins>resource_id</ins>, location_x, location_y, type, amount)

Keeps track of where resources are located on the map, and how much is available at each point
