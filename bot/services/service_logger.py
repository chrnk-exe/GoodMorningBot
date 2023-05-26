import logging
import os
isProduction = os.getenv('APP_MODE') == 'production'

service_logger = logging.getLogger('ServiceLogger')
service_logger.setLevel(logging.INFO if isProduction else logging.DEBUG)
handler = logging.FileHandler(f"{os.getcwd()}/logs/services.log", mode='a')
handler.setFormatter(logging.Formatter("%(name)s %(asctime)s %(levelname)s %(message)s"))
service_logger.addHandler(handler)


def logger(func):
	def wrapper(*args, **kwargs):
		return_value = func(*args, **kwargs)
		service_logger.debug(f'New request from {func.__name__} with args: {args}. Return value: {return_value}')
		return return_value
	return wrapper


