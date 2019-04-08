export MYSQL_DATABASE=musedb
export MYSQL_USER=root
export MYSQL_PASSWORD=sonu_kumar
if [[ -z "${MYSQL_CI_URL}" ]]; then
export MYSQL_CI_URL=jdbc:mysql://localhost:3306/musedb
fi