/Applications/CocosCreator.app/Contents/MacOS/CocosCreator --path . --build "platform=web-mobile"
/Applications/CocosCreator.app/Contents/MacOS/CocosCreator --path . --build "platform=web-desktop"

cd build/web-mobile
git init
git remote add origin https://github.com/hehao98/PlayQualityCampus-Mobile.git
git add .
git commit -m "update"
git push -u origin master --force
cd ../../

cd build/web-desktop
git init
git remote add origin https://github.com/hehao98/PlayQualityCampus-Desktop.git
git add .
git commit -m "update"
git push -u origin master --force
cd ../../