1. make sure event server is running on --ip 0.0.0.0 from /etc/service
2. start requirements using bash "runsvdir-start&" (runsvdir-start starts services from /etc/service)
3. check server is up on port 9000 and event server is listening on port 7070 (accessable through localhost and 0.0.0.0)
4. create new prediction.io app and update keys.js with app ID and key (bash "pio app new MyApp1")
5. import events into server using import script (engine/scala/data/import.js)
6. pio build engine
7. pio train
8. pio deploy --ip 0.0.0.0