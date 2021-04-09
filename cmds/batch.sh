for f in *.js; do 
    mv -- "$f" "${f%.txt}.ts"
done