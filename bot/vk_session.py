import vk_api
import os
from dotenv import load_dotenv

load_dotenv()

token = os.getenv('TOKEN')
vk_session = vk_api.VkApi(token=token)
