from django.test import TestCase
from rest_framework.test import APITestCase
from rest_api.views import ImageView

# Create your tests here.
class ImageViewTestCase(APITestCase):
    def setUp(self):
        ImageView.objects.create(image_url="http://example.com/image.png", description="test description", product_id="1", firebase_uid="test_user")

    def test_get_images(self):
        '''Test that the correct queryset is returned'''
        response = self.client.get('/api/images/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)



