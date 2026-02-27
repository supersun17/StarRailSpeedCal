# Star Rail Speed Calculator

## Goal
Create visual representation for characters movement for a turn-based game, making team speed tuning easier to understand.
To make it easier to access, this is a static website.

## Features
- Add Characters with speed, actions that affect speed
- There are 4 Characters
- For each Character, a turn is a solid bar with length represent how long it takes to finish the turn.
- Each Character has a unique bar color.
- The visual representation should be a timeline of turns, with each character's turn represented by blocks of bars.
- The timeline should be scrollable and zoomable.
- All Characters bar are aligned at the start of the timeline, lay vertically, and going upword.
- User can edit the speed of each Character, once the speed is changed, the bar should update immediately.
- User can set the speed of a Character to 0, this will gray out the corresponding bar.

## Calculation/Algorithm details
- Consider there are many stations on a very long path. The distance between two stations is 10000 units.
- A Character start at 0, and will move to the next station. A Character can only attack when he is at a station.
- The time is takes to reach the next station, is 10000 / speed.
- The time it takes to finish a turn, can then be used to calculate the length of a block of a bar.
- The standard speed is 100, so the standard time to reach the next station is 10000 / 100 = 100 units.
- On the center of each block of a bar, there should be a number representing the turn number.