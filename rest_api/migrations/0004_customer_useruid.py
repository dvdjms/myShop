# Generated by Django 4.2.7 on 2023-11-25 14:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rest_api', '0003_customer'),
    ]

    operations = [
        migrations.AddField(
            model_name='customer',
            name='userUID',
            field=models.CharField(max_length=2000, null=True),
        ),
    ]
